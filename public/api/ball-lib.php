<?php
declare(strict_types=1);
// Config and locks are outside public_html/www. This file contains no credentials.
function ball_home(): string { return getenv('BALL_PRIVATE_DIR') ? getenv('BALL_PRIVATE_DIR') : dirname(__DIR__, 3).'/.otrazis-ball'; }
function ball_config(): array {
    $path = ball_home().'/config.json';
    if (!is_file($path)) throw new RuntimeException('Система билетов ещё настраивается.', 503);
    return json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
}
function ball_db(array $c): PDO {
    return new PDO($c['dsn'], $c['db_user'], $c['db_password'], [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES=>false]);
}
function ball_schema(PDO $db): void {
    $suffix = $db->getAttribute(PDO::ATTR_DRIVER_NAME)==='mysql' ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' : '';
    $db->exec('CREATE TABLE IF NOT EXISTS ball_orders (id VARCHAR(36) PRIMARY KEY, request_id VARCHAR(36) NOT NULL UNIQUE, payload_hash VARCHAR(64) NOT NULL, ticket VARCHAR(12) NOT NULL, is_test INTEGER NOT NULL, seats INTEGER NOT NULL, price INTEGER NOT NULL, amount INTEGER NOT NULL, name VARCHAR(160) NOT NULL, guest VARCHAR(160) NOT NULL, email VARCHAR(254) NOT NULL, phone VARCHAR(40) NOT NULL, status VARCHAR(24) NOT NULL, code_hash VARCHAR(64) NULL, payment_id VARCHAR(64) NULL UNIQUE, payment_url TEXT NULL, payment_started BIGINT NULL, ticket_number VARCHAR(30) NULL UNIQUE, created_at BIGINT NOT NULL, paid_at BIGINT NULL, checked_at BIGINT NULL, consent_version VARCHAR(40) NOT NULL, utm TEXT NOT NULL)'.$suffix);
    $db->exec('CREATE TABLE IF NOT EXISTS ball_codes (code_hash VARCHAR(64) PRIMARY KEY, label VARCHAR(40) NOT NULL, active INTEGER NOT NULL DEFAULT 1, is_test INTEGER NOT NULL, order_id VARCHAR(36) NULL UNIQUE, created_at BIGINT NOT NULL, used_at BIGINT NULL)'.$suffix);
}
function ball_query(PDO $db, string $sql, array $args=[]): PDOStatement { $s=$db->prepare($sql);$s->execute($args);return $s; }
function ball_token(array $c,string $id): string { return hash_hmac('sha256',$id,$c['app_key']); }
function ball_uuid(): string { $x=random_bytes(16);$x[6]=chr((ord($x[6])&15)|64);$x[8]=chr((ord($x[8])&63)|128);$h=bin2hex($x);return substr($h,0,8).'-'.substr($h,8,4).'-'.substr($h,12,4).'-'.substr($h,16,4).'-'.substr($h,20); }
function ball_order(PDO $db,string $id): array { $o=ball_query($db,'SELECT * FROM ball_orders WHERE id=?',[$id])->fetch();if(!$o)throw new RuntimeException('Заказ не найден.',404);return $o; }
function ball_authorized(PDO $db,array $c,string $id,string $token): array { if(!hash_equals(ball_token($c,$id),$token))throw new RuntimeException('Ссылка на заказ недействительна.',403);return ball_order($db,$id); }
function ball_public(array $c,array $o): array { return ['id'=>$o['id'],'token'=>ball_token($c,$o['id']),'ticket'=>$o['ticket'],'seats'=>(int)$o['seats'],'amount'=>(int)$o['amount'],'status'=>$o['status'],'number'=>$o['ticket_number'],'lotCredit'=> $o['status']==='paid'?(int)$o['amount']:0,'test'=>(bool)$o['is_test']]; }
function ball_code(string $s): string {return strtoupper(preg_replace('/\s+/u','',trim($s)));}
function ball_with_lock(string $key,callable $fn): mixed {
    $f=fopen(ball_home().'/lock-'.hash('sha256',$key),'c');if(!$f)throw new RuntimeException('Сервис временно недоступен.',503);
    try {if(!flock($f,LOCK_EX))throw new RuntimeException('Повторите запрос.',503);return $fn();}finally{flock($f,LOCK_UN);fclose($f);}
}
function ball_rate(string $key,int $max,int $seconds): void {
    ball_with_lock('rate-'.$key,function()use($key,$max,$seconds){
        $f=ball_home().'/rate-'.hash('sha256',$key).'.json';$v=is_file($f)?json_decode(file_get_contents($f),true):null;
        if(!$v || $v['start']<time()-$seconds)$v=['start'=>time(),'count'=>0];
        if($v['count'] >= $max)throw new RuntimeException('Слишком много попыток. Попробуйте позже.',429);
        $v['count']++;file_put_contents($f,json_encode($v));chmod($f,0600);
    });
}
function ball_create(PDO $db,array $c,array $b): array {
    if(empty($c['enabled']))throw new RuntimeException('Продажа билетов пока не открыта.',503);
    if(time()>strtotime('2026-12-11 23:59:59 +0300'))throw new RuntimeException('Продажа билетов завершена.',409);
    $type=$b['ticket']??'';if(!in_array($type,['single','pair'],true))throw new RuntimeException('Выберите билет.',400);
    $request=$b['requestId']??'';if(!is_string($request)||!preg_match('/^[0-9a-f-]{36}$/D',$request))throw new RuntimeException('Обновите страницу.',400);
    $fields=[];foreach(['name'=>160,'guest'=>160,'email'=>254,'phone'=>40,'promo'=>80] as $key=>$limit){$v=$b[$key]??'';if(!is_string($v)||mb_strlen($v)>$limit)throw new RuntimeException('Проверьте поля формы.',400);$fields[$key]=trim($v);}
    if(mb_strlen($fields['name'])<2||!filter_var($fields['email'],FILTER_VALIDATE_EMAIL)||!preg_match('/^[+()\d\s-]{7,40}$/D',$fields['phone']))throw new RuntimeException('Укажите имя, email и телефон.',400);
    if($type==='pair'&&mb_strlen($fields['guest'])<2)throw new RuntimeException('Укажите имя второго гостя.',400);
    if(($b['consent']??false)!==true)throw new RuntimeException('Подтвердите согласие с условиями.',400);
    if(!empty($b['website']))throw new RuntimeException('Не удалось оформить заказ.',400);
    $promo=ball_code($fields['promo']);$hash=hash('sha256',json_encode([$type,$fields],JSON_UNESCAPED_UNICODE));
    return ball_with_lock('request-'.$request,function()use($db,$c,$b,$type,$request,$fields,$promo,$hash){
        $old=ball_query($db,'SELECT * FROM ball_orders WHERE request_id=?',[$request])->fetch();
        if($old){if(!hash_equals($old['payload_hash'],$hash))throw new RuntimeException('Этот заказ уже создан. Продолжите его оплату.',409);return ball_public($c,$old);}
        if(!$promo && (empty($c['secret_key']) || empty($c['receipt_confirmed'])))throw new RuntimeException('Оплата ещё настраивается. Свяжитесь с организатором.',503);
        $id=ball_uuid();$price=$type==='pair'?50000:35000;$now=time();$codeHash=$promo?hash('sha256',$promo):null;
        $db->beginTransaction();
        try {
            if($codeHash){$updated=ball_query($db,'UPDATE ball_codes SET order_id=?,used_at=? WHERE code_hash=? AND active=1 AND order_id IS NULL AND is_test=?',[$id,$now,$codeHash,(int)$c['test_mode']]);if($updated->rowCount()!==1)throw new RuntimeException('Код друга недействителен или уже использован.',409);}
            $utm=[];foreach(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'] as $key){$v=$b['utm'][$key]??'';if(is_string($v))$utm[$key]=mb_substr($v,0,200);}
            ball_query($db,'INSERT INTO ball_orders (id,request_id,payload_hash,ticket,is_test,seats,price,amount,name,guest,email,phone,status,code_hash,ticket_number,created_at,paid_at,consent_version,utm) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[$id,$request,$hash,$type,(int)$c['test_mode'],$type==='pair'?2:1,$price,$promo?0:$price,$fields['name'],$type==='pair'?$fields['guest']:'',strtolower($fields['email']),$fields['phone'],$promo?'free':'pending',$codeHash,$promo?'BALL-'.strtoupper(substr(str_replace('-','',$id),0,16)):null,$now,$promo?$now:null,'ball-2026-11-06',json_encode($utm,JSON_UNESCAPED_UNICODE)]);
            $db->commit();return ball_public($c,ball_order($db,$id));
        } catch(Throwable $e){if($db->inTransaction())$db->rollBack();throw $e;}
    });
}
function ball_yk(array $c,string $method,string $path,?array $body=null,?string $key=null): array {
    if(empty($c['secret_key']))throw new RuntimeException('ЮKassa ещё не подключена.',503);
    $ch=curl_init('https://api.yookassa.ru/v3/'.$path);
    $headers=['Content-Type: application/json'];if($key)$headers[]='Idempotence-Key: '.$key;
    curl_setopt_array($ch,[CURLOPT_RETURNTRANSFER=>true,CURLOPT_CUSTOMREQUEST=>$method,CURLOPT_USERPWD=>$c['shop_id'].':'.$c['secret_key'],CURLOPT_HTTPAUTH=>CURLAUTH_BASIC,CURLOPT_HTTPHEADER=>$headers,CURLOPT_CONNECTTIMEOUT=>5,CURLOPT_TIMEOUT=>25,CURLOPT_FOLLOWLOCATION=>false]);
    if($body!==null)curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($body,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR));
    $raw=curl_exec($ch);$status=curl_getinfo($ch,CURLINFO_RESPONSE_CODE);curl_close($ch);
    if($raw===false||$status<200||$status>=300)throw new RuntimeException('ЮKassa временно недоступна. Повторите проверку этого заказа.',502);
    return json_decode($raw,true,512,JSON_THROW_ON_ERROR);
}
function ball_verify(array $c,array $o,array $p): void {
    $expected=number_format((int)$o['amount'],2,'.','');
    if(($p['amount']['value']??null)!==$expected||($p['amount']['currency']??null)!=='RUB'||($p['metadata']['ball_order_id']??null)!==$o['id']||($p['recipient']['account_id']??null)!==(string)$c['shop_id']||($p['test']??false)!==(bool)$c['test_mode']||empty($p['id'])||!preg_match('/^[a-zA-Z0-9-]{10,64}$/D',$p['id']))throw new RuntimeException('Платёж не соответствует заказу. Обратитесь к организатору.',409);
    if((bool)$o['is_test']!==(bool)$c['test_mode'] || $o['amount']<=0||$o['status']==='free'||($o['payment_id']&&$o['payment_id']!==$p['id']))throw new RuntimeException('Платёж не соответствует заказу.',409);
}
function ball_apply(PDO $db,array $c,array $o,array $p): array {
    ball_verify($c,$o,$p);
    $state=$p['status']??'';$status=($state==='succeeded'&&($p['paid']??false)===true)?'paid':($state==='canceled'?'canceled':'pending');
    $refunded=$p['refunded_amount']['value']??'0.00';
    if($status==='paid' && is_string($refunded) && preg_match('/^\d+\.\d{2}$/D',$refunded) && (float)$refunded>0)$status='refunded';
    // Never roll back a terminal result because of an older concurrent response.
    $url=$p['confirmation']['confirmation_url']??null;
    if($url!==null && (!is_string($url)||!preg_match('~^https://(?:[a-z0-9-]+\.)*(?:yookassa\.ru|yoomoney\.ru)/~i',$url)))throw new RuntimeException('Некорректная ссылка оплаты.',502);
    $number='BALL-'.strtoupper(substr(str_replace('-','',$o['id']),0,16));
    ball_query($db,"UPDATE ball_orders SET payment_id=?,payment_url=COALESCE(?,payment_url),status=?,ticket_number=CASE WHEN ?='paid' THEN ? ELSE ticket_number END,paid_at=CASE WHEN ?='paid' THEN COALESCE(paid_at,?) ELSE paid_at END,checked_at=? WHERE id=? AND (payment_id IS NULL OR payment_id=?) AND (status='pending' OR status=? OR (status='paid' AND ?='refunded'))",[$p['id'],$url,$status,$status,$number,$status,time(),time(),$o['id'],$p['id'],$status,$status]);
    return ball_order($db,$o['id']);
}
function ball_payload(array $c,array $o): array {
    $description='Предновогодний бал «Отражение добра», 11.12.2026 — '.($o['ticket']==='pair'?'билет 1+1':'билет на одного');
    $amount=['value'=>number_format((int)$o['amount'],2,'.',''),'currency'=>'RUB'];
    $body=['amount'=>$amount,'capture'=>true,'confirmation'=>['type'=>'redirect','return_url'=>$c['site'].'/peterburg?order='.$o['id'].'#tickets'],'description'=>$description,'metadata'=>['ball_order_id'=>$o['id']]];
    if(($c['receipt_mode']??'')==='yookassa'){
        $body['receipt']=['customer'=>['email'=>$o['email']],'items'=>[['description'=>$description,'quantity'=>'1.00','amount'=>$amount,'vat_code'=>(int)$c['vat_code'],'payment_subject'=>'service','payment_mode'=>$c['payment_mode']]]];
        if(!empty($c['tax_system_code']))$body['receipt']['tax_system_code']=(int)$c['tax_system_code'];
    }
    return $body;
}
function ball_pay(PDO $db,array $c,string $id,?callable $transport=null): array {
    $send=$transport ?? fn($method,$path,$body=null,$key=null)=>ball_yk($c,$method,$path,$body,$key);
    return ball_with_lock('payment-'.$id,function()use($db,$c,$id,$send){
        $o=ball_order($db,$id);if((bool)$o['is_test']!==(bool)$c['test_mode'])throw new RuntimeException('Заказ создан в другом режиме магазина. Свяжитесь с организатором.',409);if(in_array($o['status'],['paid','free','refunded','canceled'],true))return ball_public($c,$o);
        if(empty($c['enabled']))throw new RuntimeException('Продажа временно приостановлена.',503);
        if(empty($c['receipt_confirmed']))throw new RuntimeException('Оплата ещё настраивается.',503);
        if($o['payment_id'])$p=$send('GET','payments/'.rawurlencode($o['payment_id']));
        else {
            if($o['payment_started'] && time()-(int)$o['payment_started']>23*3600)throw new RuntimeException('Нужна сверка платежа организатором. Не оплачивайте повторно.',409);
            if(!$o['payment_started'])ball_query($db,'UPDATE ball_orders SET payment_started=? WHERE id=?',[time(),$id]);
            $p=$send('POST','payments',ball_payload($c,$o),$id);
        }
        $o=ball_apply($db,$c,$o,$p);$result=ball_public($c,$o);if($o['status']==='pending')$result['confirmationUrl']=$o['payment_url'];return $result;
    });
}
function ball_generate(PDO $db,int $count,bool $testMode=false): array {
    if($count<1||$count>100)throw new RuntimeException('За один раз можно создать от 1 до 100 кодов.',400);
    $codes=[];$db->beginTransaction();try{for($i=0;$i<$count;$i++){$code='DRUG-'.strtoupper(bin2hex(random_bytes(8)));ball_query($db,'INSERT INTO ball_codes (code_hash,label,created_at,is_test) VALUES (?,?,?,?)',[hash('sha256',$code),'DRUG-…'.substr($code,-6),time(),(int)$testMode]);$codes[]=$code;}$db->commit();return $codes;}catch(Throwable $e){$db->rollBack();throw $e;}
}
