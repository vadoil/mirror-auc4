<?php
require __DIR__.'/../../public/api/ball-lib.php';
if(PHP_SAPI!=='cli'||!getenv('BALL_PRIVATE_DIR'))exit(1);
@mkdir(ball_home(),0700,true);
$c=['dsn'=>'sqlite:'.ball_home().'/test.sqlite','db_user'=>'','db_password'=>'','app_key'=>str_repeat('t',64),'shop_id'=>'1495081','secret_key'=>'fixture','site'=>'http://localhost:5197','test_mode'=>true,'enabled'=>true,'receipt_confirmed'=>true,'receipt_mode'=>'external','admin_hash'=>password_hash('test-admin-password',PASSWORD_DEFAULT)];
$db=ball_db($c);ball_schema($db);file_put_contents(ball_home().'/config.json',json_encode($c));file_put_contents(ball_home().'/codes.json',json_encode(ball_generate($db,4,true)));
