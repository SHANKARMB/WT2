<?php
	header("Content-type:image/jpeg");
	extract($_GET);
	$file=fopen("../data/users.txt","a");
	fwrite($file,';'.$register);
	fclose($file);
	$im=imagecreate(1,1);
	imagecolorallocate($im,0,0,0);
	imagejpeg($im);
?>