<?php
declare(strict_types=1);
require __DIR__.'/ball-lib.php';
ini_set('display_errors','0');
header('Content-Type: application/json; charset=utf-8');header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');header('Referrer-Policy: no-referrer');
function respond(array $v,int $code=200): never {http_response_code($code);echo json_encode($v,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);exit;}
try {
 $c=ball_config();$action=$_GET['action']??'config';$method=$_SERVER['REQUEST_METHOD'];
 if($method==='GET'&&$action==='config')respond(['ok'=>true,'enabled'=>(bool)$c['enabled'],'test'=>(bool)$c['test_mode'],'prices'=>['single'=>35000,'pair'=>50000]]);
 if($method!=='POST')respond(['error'=>'Метод не поддерживается'],405);
 if((int)($_SERVER['CONTENT_LENGTH']??0)>16384)respond(['error'=>'Слишком большой запрос'],413);
 $raw=file_get_contents('php://input',false,null,0,16385);if(strlen($raw)>16384)respond(['error'=>'Слишком большой запрос'],413);
 $b=json_decode($raw,true,512,JSON_THROW_ON_ERROR);if(!is_array($b))respond(['error'=>'Некорректный запрос'],400);
 $db=ball_db($c);
 if($action==='webhook'){
   if(!in_array($b['event']??'',['payment.succeeded','payment.canceled','refund.succeeded'],true))respond(['ok'=>true]);
   $pid=$b['object']['id']??'';if(!is_string($pid)||!preg_match('/^[a-zA-Z0-9-]{10,64}$/D',$pid))respond(['error'=>'Неверный идентификатор'],400);
   if($b['event']==='refund.succeeded'){$refund=ball_yk($c,'GET','refunds/'.rawurlencode($pid));$pid=$refund['payment_id']??'';if(!preg_match('/^[a-zA-Z0-9-]{10,64}$/D',$pid))respond(['error'=>'Неверный платёж'],400);}
   // Incoming amount/status/metadata are never trusted: get the object using merchant credentials.
   $p=ball_yk($c,'GET','payments/'.rawurlencode($pid));$id=$p['metadata']['ball_order_id']??'';
   if(!is_string($id)||!preg_match('/^[a-f0-9-]{36}$/D',$id))respond(['ok'=>true]); // another product in same shop
   $o=ball_query($db,'SELECT * FROM ball_orders WHERE id=?',[$id])->fetch();if(!$o)respond(['error'=>'Заказ пока не найден'],503);
   ball_apply($db,$c,$o,$p);respond(['ok'=>true]);
 }
 $origin=$_SERVER['HTTP_ORIGIN']??'';
 if($origin!=='' && rtrim($origin,'/')!==$c['site'])respond(['error'=>'Недопустимый источник запроса'],403);
 if(strtolower($_SERVER['HTTP_SEC_FETCH_SITE']??'')==='cross-site')respond(['error'=>'Недопустимый источник запроса'],403);
 $ip=$_SERVER['REMOTE_ADDR']??'unknown'; // Do not trust user-supplied forwarding headers.
 ball_rate('public-'.$ip,120,60);
 if($action==='create') {ball_rate('create-'.$ip,20,3600);respond(['ok'=>true,'order'=>ball_create($db,$c,$b)]);}
 if(in_array($action,['status','pay'],true)){
   $id=$b['id']??'';$token=$b['token']??'';if(!is_string($id)||!is_string($token)||strlen($id)!==36||strlen($token)!==64)respond(['error'=>'Неверная ссылка заказа'],403);
   $o=ball_authorized($db,$c,$id,$token);
   if($action==='pay'){ball_rate('pay-'.$id,10,60);respond(['ok'=>true,'order'=>ball_pay($db,$c,$id)]);}
   if($o['payment_id'] && (!in_array($o['status'],['free','refunded','canceled'],true)) && (int)$o['checked_at']<time()-10){
      $p=ball_yk($c,'GET','payments/'.rawurlencode($o['payment_id']));$o=ball_apply($db,$c,$o,$p);
   }
   respond(['ok'=>true,'order'=>ball_public($c,$o)]);
 }
 respond(['error'=>'Неизвестная операция'],404);
} catch(JsonException $e){respond(['error'=>'Некорректный запрос'],400);}
catch(Throwable $e){$code=$e instanceof RuntimeException && in_array($e->getCode(),[400,403,404,409,429,502,503],true)?$e->getCode():500;if($code===500)error_log('ball: '.get_class($e).' code '.$e->getCode());respond(['error'=>$code===500?'Не удалось обработать запрос. Повторите попытку.':$e->getMessage()],$code);}
