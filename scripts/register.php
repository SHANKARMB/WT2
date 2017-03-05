<?php
extract($_GET);
$file=fopen("data/users.txt","a");
fwrite($file,';'.$register);
fclose($file);
?>