<?php
declare(strict_types=1);
require __DIR__.'/../../public/api/ball-lib.php';
$dir=sys_get_temp_dir().'/ball-tests-'.bin2hex(random_bytes(6));mkdir($dir,0700);putenv('BALL_PRIVATE_DIR='.$dir);
$c=['dsn'=>getenv('BALL_TEST_DSN')?:'sqlite:'.$dir.'/test.sqlite','db_user'=>getenv('BALL_TEST_DSN')?'root':'','db_password'=>'','app_key'=>str_repeat('a',64),'shop_id'=>'1495081','secret_key'=>'fixture-only','site'=>'https://xn--80aodvkjc9f.xn--p1ai','test_mode'=>true,'enabled'=>true,'receipt_confirmed'=>true,'receipt_mode'=>'yookassa','vat_code'=>1,'tax_system_code'=>0,'payment_mode'=>'full_prepayment'];
$db=ball_db($c);if($db->getAttribute(PDO::ATTR_DRIVER_NAME)==='sqlite')$db->exec('PRAGMA busy_timeout=10000');ball_schema($db);$n=0;
function ok(bool $v,string $msg):void{global $n;if(!$v)throw new RuntimeException('FAIL '.$msg);$n++;echo "PASS $msg\n";}
function bad(callable $f,int $code,string $msg):void{try{$f();}catch(RuntimeException $e){ok($e->getCode()===$code,$msg);return;}throw new RuntimeException('FAIL expected error '.$msg);}
function form(string $ticket='single',string $promo=''):array{return ['requestId'=>ball_uuid(),'ticket'=>$ticket,'name'=>'Тестовая Гостья','guest'=>'Вторая Гостья','email'=>'test@example.org','phone'=>'+79990000000','promo'=>$promo,'consent'=>true,'amount'=>1];}
function verified(array $o,array $c):array{return ['id'=>'test-payment-'.str_replace('-','',$o['id']),'status'=>'succeeded','paid'=>true,'test'=>true,'recipient'=>['account_id'=>$c['shop_id']],'amount'=>['value'=>number_format($o['amount'],2,'.',''),'currency'=>'RUB'],'metadata'=>['ball_order_id'=>$o['id']]];}
try{
 $b=form();$o=ball_create($db,$c,$b);ok($o['amount']===35000,'browser cannot override single price');
 $again=ball_create($db,$c,$b);ok($o['id']===$again['id'],'duplicate submit returns same order');
 $changed=$b;$changed['ticket']='pair';bad(fn()=>ball_create($db,$c,$changed),409,'request ID cannot change order');
 $pair=ball_create($db,$c,form('pair'));ok($pair['amount']===50000&&$pair['seats']===2,'pair is 50000 and two guests');
 bad(fn()=>ball_authorized($db,$c,$o['id'],str_repeat('b',64)),403,'unknown bearer denied');
 $live=$c;$live['test_mode']=false;bad(fn()=>ball_pay($db,$live,$o['id'],fn()=>throw new RuntimeException('must not call')),409,'test order cannot charge live shop');
 $codes=ball_generate($db,2,true);$free=ball_create($db,$c,form('pair',strtolower($codes[0])));ok($free['status']==='free'&&$free['amount']===0&&$free['seats']===2&&$free['lotCredit']===0,'free pair code');
 bad(fn()=>ball_create($db,$c,form('single',$codes[0])),409,'used code cannot be reused');
 ball_query($db,'UPDATE ball_codes SET active=0 WHERE code_hash=?',[hash('sha256',$codes[1])]);bad(fn()=>ball_create($db,$c,form('pair',$codes[1])),409,'revoked code denied');
 ok((int)ball_query($db,'SELECT COUNT(*) FROM ball_orders')->fetchColumn()===3,'invalid codes leave no orphan orders');
 $row=ball_order($db,$o['id']);$p=verified($row,$c);
 foreach(['amount','shop','metadata','test','currency'] as $field){$v=$p;switch($field){case 'amount':$v['amount']['value']='1.00';break;case 'shop':$v['recipient']['account_id']='wrong';break;case 'metadata':$v['metadata']['ball_order_id']='wrong';break;case 'test':$v['test']=false;break;case 'currency':$v['amount']['currency']='USD';break;}bad(fn()=>ball_apply($db,$c,$row,$v),409,'reject '.$field.' mismatch');}
 $unpaid=$p;$unpaid['paid']=false;$r=ball_apply($db,$c,$row,$unpaid);ok($r['status']==='pending','status succeeded alone does not issue ticket');
 $r=ball_apply($db,$c,$r,$p);$number=$r['ticket_number'];ok($r['status']==='paid'&&$number,'paid API verification issues ticket');
 $r2=ball_apply($db,$c,$r,$p);ok($r2['ticket_number']===$number,'duplicate webhook preserves ticket');
 $stale=$p;$stale['status']='pending';$stale['paid']=false;$r3=ball_apply($db,$c,$row,$stale);ok($r3['status']==='paid','late pending cannot overwrite paid');
 $p['refunded_amount']=['value'=>'100.00','currency'=>'RUB'];$r=ball_apply($db,$c,$r3,$p);ok($r['status']==='refunded'&&ball_public($c,$r)['lotCredit']===0,'refund flags admission for review');
 $pairRow=ball_order($db,$pair['id']);$pairPaid=ball_apply($db,$c,$pairRow,verified($pairRow,$c));ok(ball_public($c,$pairPaid)['lotCredit']===50000,'full 50000 lot credit');
 $payload=ball_payload($c,$pairRow);ok($payload['receipt']['items'][0]['amount']['value']==='50000.00'&&!str_contains($payload['confirmation']['return_url'],'token='),'receipt and return URL without bearer token');
 $pending=ball_create($db,$c,form());$keys=[];$calls=0;
 $transport=function($method,$path,$body=null,$key=null)use(&$keys,&$calls,$pending,$c){$keys[]=$key;$calls++;if($calls===1)throw new RuntimeException('network',502);$p=verified($pending,$c);$p['status']='pending';$p['paid']=false;$p['confirmation']=['confirmation_url'=>'https://yoomoney.ru/checkout/test'];return $p;};
 bad(fn()=>ball_pay($db,$c,$pending['id'],$transport),502,'creation timeout surfaces without fake payment');
 $res=ball_pay($db,$c,$pending['id'],$transport);ok(count($keys)===2&&$keys[0]===$keys[1]&&$res['confirmationUrl'],'retry uses stable idempotency key');
 $expired=ball_create($db,$c,form());ball_query($db,'UPDATE ball_orders SET payment_started=? WHERE id=?',[time()-86400,$expired['id']]);bad(fn()=>ball_pay($db,$c,$expired['id'],$transport),409,'no automatic second payment after idempotency window');
 if(function_exists('pcntl_fork')){
   $code=ball_generate($db,1,true)[0];$pids=[];
   for($i=0;$i<2;$i++){ $pid=pcntl_fork();if($pid===0){$conn=ball_db($c);if($conn->getAttribute(PDO::ATTR_DRIVER_NAME)==='sqlite')$conn->exec('PRAGMA busy_timeout=10000');try{ball_create($conn,$c,form('pair',$code));exit(0);}catch(RuntimeException $e){exit($e->getCode()===409?9:20);}}$pids[]=$pid; }
   $results=[];foreach($pids as $pid){pcntl_waitpid($pid,$status);$results[]=pcntl_wexitstatus($status);}sort($results);ok($results===[0,9],'concurrent use: exactly one friend succeeds');
 }
 echo "TOTAL $n checks passed\n";
}finally{foreach(glob($dir.'/*') as $file)unlink($file);rmdir($dir);}
