<?php
extract($_POST);
$file=fopen("data/users.txt","a");
fwrite($file,';'.$register);
fclose($file);
?>