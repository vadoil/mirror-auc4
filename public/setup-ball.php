<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli'){http_response_code(404);exit;}
require __DIR__.'/api/ball-lib.php';
umask(0077);date_default_timezone_set('Europe/Moscow');
$dir=ball_home();if(!is_dir($dir)&&!mkdir($dir,0700,true))throw new RuntimeException('Cannot create private folder');
function ask(string $label,string $default='',bool $secret=false):string{
 fwrite(STDOUT,$label.($default!==''&&!$secret?' ['.$default.']':'').': ');
 if($secret)system('stty -echo');
 try{$s=trim((string)fgets(STDIN));}finally{if($secret){system('stty echo');fwrite(STDOUT,"\n");}}
 return $s===''?$default:$s;
}
function save_config(array $c):void{
 $path=ball_home().'/config.json';$tmp=$path.'.tmp';file_put_contents($tmp,json_encode($c,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR));chmod($tmp,0600);rename($tmp,$path);
}
try{
 $action=$argv[1]??'setup';
 if($action==='setup'){
  $old=is_file($dir.'/config.json')?ball_config():[];
  $host=ask('Хост MySQL',$old['db_host']??'localhost');$name=ask('Имя базы',$old['db_name']??'u3713220_otrazis');$user=ask('Пользователь базы',$old['db_user']??'u3713220_otrazis');$pass=ask('Пароль базы (скрыт; пусто — оставить прежний)',$old['db_password']??'',true);
  if(!preg_match('/^[a-zA-Z0-9_.-]+$/D',$host)||!preg_match('/^[a-zA-Z0-9_]+$/D',$name))throw new RuntimeException('Неверное имя хоста или базы.');
  $shop=ask('Shop ID',$old['shop_id']??'1495081');$key=ask('Секретный ключ ЮKassa (скрыт; пусто — оставить прежний)',$old['secret_key']??'',true);
  $admin=ask('Новый пароль кабинета организатора, минимум 14 символов (скрыт; пусто — оставить прежний)','',true);
  if(strlen($admin)<14 && (!$old||$admin!==''))throw new RuntimeException('Нужен пароль организатора от 14 символов.');
  $test=ask('Тестовый магазин? yes/no',isset($old['test_mode'])&&$old['test_mode']?'yes':'no');
  fwrite(STDOUT,"Чеки: yookassa — передавать чек в подключённую кассу ЮKassa; external — чек формирует ваша отдельная интеграция; notready — пока не настроено.\n");
  $receipt=ask('Способ выдачи чеков',$old['receipt_mode']??'notready');if(!in_array($receipt,['yookassa','external','notready'],true))throw new RuntimeException('Неизвестный способ чеков.');
  $vat=0;$tax=0;$paymentMode="";
  if($receipt==='yookassa'){$vat=(int)ask('Код НДС ЮKassa (по настройкам вашей кассы; 1 — без НДС)');if($vat<1||$vat>12)throw new RuntimeException('Проверьте код НДС.');$tax=(int)ask('Код системы налогообложения (0 — определяется кассой)','0');if($tax<0||$tax>6)throw new RuntimeException('Неверный код СНО.');$paymentMode=ask('Признак расчёта по настройкам кассы: full_prepayment / prepayment / full_payment',$old['payment_mode']??'');if(!in_array($paymentMode,['full_prepayment','prepayment','full_payment'],true))throw new RuntimeException('Уточните признак расчёта для билетов в кассе.');}
  $confirmed=$receipt!=='notready'&&ask('Выдача чеков для платных билетов настроена и проверена? yes/no','no')==='yes';
  $c=['dsn'=>"mysql:host=$host;dbname=$name;charset=utf8mb4",'db_host'=>$host,'db_name'=>$name,'db_user'=>$user,'db_password'=>$pass,'shop_id'=>$shop,'secret_key'=>$key,'app_key'=>$old['app_key']??bin2hex(random_bytes(32)),'admin_hash'=>$admin!==''?password_hash($admin,PASSWORD_DEFAULT):$old['admin_hash'],'site'=>'https://xn--80aodvkjc9f.xn--p1ai','enabled'=>false,'test_mode'=>$test==='yes','receipt_mode'=>$receipt,'receipt_confirmed'=>$confirmed,'vat_code'=>$vat,'tax_system_code'=>$tax,'payment_mode'=>$paymentMode];
  $db=ball_db($c);ball_schema($db);save_config($c);
  fwrite(STDOUT,"База подключена. Таблицы созданы без удаления существующих данных. Продажи ЗАКРЫТЫ.\nКабинет: ".$c['site']."/api/ball-admin.php\nWebhook: ".$c['site']."/api/ball.php?action=webhook\n");
 }elseif($action==='enable'||$action==='disable'){
  $c=ball_config();ball_db($c);
  if($action==='enable'){
   if(empty($c['receipt_confirmed']))throw new RuntimeException('Сначала настройте способ выдачи чеков командой setup.');
   ball_yk($c,'GET','payments?limit=1');
   if(ask('Открыть продажи в '.($c['test_mode']?'ТЕСТОВОМ':'БОЕВОМ').' магазине '.$c['shop_id'].'? Введите OPEN')!=='OPEN')exit("Без изменений.\n");
  }
  $c['enabled']=$action==='enable';save_config($c);fwrite(STDOUT,$c['enabled']?"Продажи открыты.\n":"Продажи закрыты.\n");
 }elseif($action==='check'){
  $c=ball_config();$db=ball_db($c);ball_query($db,'SELECT COUNT(*) FROM ball_orders');ball_yk($c,'GET','payments?limit=1');echo "MySQL: OK. ЮKassa: ключ принят. Shop ID: ".$c['shop_id'].". Продажи: ".($c['enabled']?'открыты':'закрыты').".\n";
 }elseif($action==='reconcile'){
  $c=ball_config();$db=ball_db($c);$count=0;
  foreach(ball_query($db,"SELECT * FROM ball_orders WHERE payment_id IS NOT NULL AND status IN ('pending','paid') ORDER BY COALESCE(checked_at,0) LIMIT 100") as $o){ball_apply($db,$c,$o,ball_yk($c,'GET','payments/'.rawurlencode($o['payment_id'])));$count++;}
  // Recover a creation response lost before its payment ID reached our database.
  $pending=ball_query($db,"SELECT MIN(payment_started) FROM ball_orders WHERE payment_id IS NULL AND payment_started IS NOT NULL AND status='pending'")->fetchColumn();
  if($pending){$url='payments?limit=100&created_at.gte='.rawurlencode(gmdate('Y-m-d\TH:i:s\Z',(int)$pending-3600));$pages=0;do{$data=ball_yk($c,'GET',$url);foreach($data['items']??[] as $p){$id=$p['metadata']['ball_order_id']??'';$o=is_string($id)?ball_query($db,'SELECT * FROM ball_orders WHERE id=?',[$id])->fetch():false;if($o){ball_apply($db,$c,$o,$p);$count++;}}$cursor=$data['next_cursor']??null;$url='payments?limit=100&cursor='.rawurlencode((string)$cursor);$pages++;}while($cursor && $pages<100);if($cursor)throw new RuntimeException('Слишком много платежей: нужна расширенная сверка.');}
  echo "Сверено платежей: $count\n";
 }else throw new RuntimeException('Команды: setup, check, enable, disable, reconcile');
}catch(Throwable $e){fwrite(STDERR,($e instanceof PDOException?'Ошибка подключения к MySQL: проверьте имя базы, пользователя, хост и пароль.':$e->getMessage())."\n");exit(1);}
