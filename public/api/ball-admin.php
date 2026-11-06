<?php
declare(strict_types=1);
require __DIR__.'/ball-lib.php';
ini_set('display_errors','0');date_default_timezone_set('Europe/Moscow');
header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');header('Referrer-Policy: no-referrer');header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");
function esc(mixed $v):string{return htmlspecialchars((string)$v,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');}
$c=ball_config();$db=ball_db($c);
session_name('otrazis_ball_admin');session_set_cookie_params(['secure'=>true,'httponly'=>true,'samesite'=>'Strict','path'=>'/api']);ini_set('session.use_strict_mode','1');session_start();
if(($_SESSION['last']??0)<time()-1800)unset($_SESSION['admin']);
$_SESSION['csrf']??=bin2hex(random_bytes(32));$error='';$codes=[];
if($_SERVER['REQUEST_METHOD']==='POST'){
 try{
  if(!hash_equals($_SESSION['csrf'],(string)($_POST['csrf']??'')))throw new RuntimeException('Обновите страницу и повторите.',403);
  $action=$_POST['action']??'';
  if($action==='login'){
   ball_rate('admin-login-'.($_SERVER['REMOTE_ADDR']??''),5,900);
   if(!password_verify((string)($_POST['password']??''),$c['admin_hash']))throw new RuntimeException('Неверный пароль.',403);
   session_regenerate_id(true);$_SESSION['admin']=true;
  }elseif(empty($_SESSION['admin']))throw new RuntimeException('Войдите в кабинет.',403);
  elseif($action==='logout'){$_SESSION=[];session_destroy();header('Location: ball-admin.php');exit;}
  elseif($action==='generate'){$codes=ball_generate($db,(int)($_POST['count']??0),(bool)$c['test_mode']);}
  elseif($action==='revoke')ball_query($db,'UPDATE ball_codes SET active=0 WHERE code_hash=? AND order_id IS NULL',[(string)($_POST['hash']??'')]);
  elseif($action==='export'){
   header('Content-Type: text/csv; charset=utf-8');header('Content-Disposition: attachment; filename="ball-orders.csv"');$f=fopen('php://output','w');fwrite($f,"\xEF\xBB\xBF");fputcsv($f,['Номер','Имя','Второй гость','Email','Телефон','Мест','К оплате, ₽','Статус','Создано МСК','Оплачено МСК','ЮKassa','Тестовый'], ';','"','');
   foreach(ball_query($db,"SELECT * FROM ball_orders ORDER BY CASE WHEN status IN ('paid','free') THEN 0 ELSE 1 END,created_at DESC") as $o){$row=[$o['ticket_number'],$o['name'],$o['guest'],$o['email'],$o['phone'],$o['seats'],$o['amount'],$o['status'],date('d.m.Y H:i',(int)$o['created_at']),$o['paid_at']?date('d.m.Y H:i',(int)$o['paid_at']):'',$o['payment_id'],$o['is_test']?'ДА':'нет'];$row=array_map(fn($v)=>preg_match('/^[=+@\-\t\r]/u',(string)$v)?"'".$v:$v,$row);fputcsv($f,$row,';','"','');}exit;
  }
  // Rotate after every successful action: resubmitting an old form cannot issue another batch.
  $_SESSION['csrf']=bin2hex(random_bytes(32));
 }catch(Throwable $e){$error=$e instanceof PDOException?'Не удалось сохранить изменение.':$e->getMessage();}
}
$_SESSION['last']=time();date_default_timezone_set('Europe/Moscow');
function hidden(string $action):void{echo '<input type="hidden" name="csrf" value="'.esc($_SESSION['csrf']).'"><input type="hidden" name="action" value="'.esc($action).'">';}
?>
<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Билеты и друзья — Отражение добра</title>
<style>body{font:16px system-ui;background:#faf8f7;color:#222;max-width:1200px;margin:auto;padding:24px}h1{font-weight:400}button{background:#ed210c;color:white;border:0;padding:12px 18px;border-radius:8px;cursor:pointer}input{padding:12px;border:1px solid #aaa;border-radius:6px}label{display:block;margin:10px 0}section{background:white;padding:22px;margin:24px 0;border:1px solid #ddd;border-radius:12px}.scroll{overflow:auto}table{border-collapse:collapse;width:100%;font-size:14px}td,th{padding:10px;border-bottom:1px solid #ddd;text-align:left}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#fff0ec;padding:20px}.error{color:#a00}.pending,.canceled,.refunded{color:#a00}.paid,.free{color:#175a32}small{color:#555}a{color:#c21d0b}</style>
<h1>Билеты и друзья · 11 декабря</h1>
<?php if($error):?><p role="alert" class="error"><?=esc($error)?></p><?php endif;?>
<?php if(empty($_SESSION['admin'])):?><form method="post"><?php hidden('login');?><label>Пароль организатора <input type="password" name="password" autocomplete="current-password" required></label><button>Войти</button></form>
<?php else:
$stats=ball_query($db,"SELECT status,is_test,COUNT(*) AS orders,SUM(seats) AS seats,SUM(amount) AS total FROM ball_orders GROUP BY status,is_test")->fetchAll();
?>
<p>Продажи: <?=$c['enabled']?'открыты':'закрыты'?> · <?=$c['test_mode']?'ТЕСТОВЫЙ режим':'боевой режим'?> · Магазин <?=esc($c['shop_id'])?></p>
<form method="post"><?php hidden('logout');?><button>Выйти</button></form>
<section><h2>Регистрации</h2><?php foreach($stats as $s):?><p><?=$s['is_test']?'ТЕСТ · ':''?><?=esc($s['status'])?>: <?=esc($s['orders'])?> заказов · <?=esc($s['seats'])?> гостей · <?=number_format((int)$s['total'],0,',',' ')?> ₽</p><?php endforeach;?>
<form method="post"><?php hidden('export');?><button>Скачать все регистрации CSV</button></form>
<div class="scroll"><table><tr><th>Номер / дата</th><th>Гости</th><th>Контакты</th><th>Сумма</th><th>Статус</th></tr>
<?php foreach(ball_query($db,'SELECT * FROM ball_orders ORDER BY created_at DESC LIMIT 500') as $o):?><tr><td><?=esc($o['ticket_number']??substr($o['id'],0,8))?><br><small><?=date('d.m.Y H:i',(int)$o['created_at'])?></small></td><td><?=esc($o['name'])?><br><?=esc($o['guest'])?></td><td><?=esc($o['email'])?><br><?=esc($o['phone'])?></td><td><?=number_format((int)$o['amount'],0,',',' ')?> ₽</td><td class="<?=esc($o['status'])?>"><?=$o['is_test']?'ТЕСТ · ':''?><?=esc($o['status'])?></td></tr><?php endforeach;?></table></div><p><small>На экране последние 500 заказов. В CSV — все. paid — оплачен, free — друг, pending — ожидает оплаты, canceled — отменён, refunded — возврат, билет требует проверки.</small></p></section>
<section><h2>Одноразовые коды друзей</h2><p>Один код даёт один бесплатный заказ: на одного или на двоих. Использованный код нельзя применить снова.</p>
<form method="post"><?php hidden('generate');?><label>Сколько новых кодов создать <input type="number" name="count" min="1" max="100" value="1" required></label><button>Создать коды</button></form>
<?php if($codes):?><h3>Скопируйте и сохраните — целиком коды показываются только сейчас</h3><pre><?=esc(implode("\n",$codes))?></pre><?php endif;?>
<div class="scroll"><table><tr><th>Код</th><th>Состояние</th><th>Гостей</th><th>Действие</th></tr>
<?php foreach(ball_query($db,'SELECT c.*,o.seats FROM ball_codes c LEFT JOIN ball_orders o ON o.id=c.order_id ORDER BY c.created_at DESC LIMIT 500') as $r):?><tr><td><?=$r['is_test']?'ТЕСТ · ':''?><?=esc($r['label'])?></td><td><?=$r['order_id']?'Использован':($r['active']?'Доступен':'Отключён')?></td><td><?=esc($r['seats']??'—')?></td><td><?php if(!$r['order_id']&&$r['active']):?><form method="post"><?php hidden('revoke');?><input type="hidden" name="hash" value="<?=esc($r['code_hash'])?>"><button>Отключить</button></form><?php endif;?></td></tr><?php endforeach;?></table></div></section>
<?php endif;?></html>
