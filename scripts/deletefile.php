<?php
	header("Content-type:image/jpeg");
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	extract($_GET);
	$temp=explode("/",$filename);
	$f=file_get_contents("../editor/repository/".$temp[0].".txt");
	$ftemp=explode(";",$f);
	unlink("../editor/repository/".$filename);
	$stack=array();
	foreach($ftemp as $existingfile){
		if($existingfile!=$temp[1])
			array_push($stack,$existingfile);
	}
	$join=implode(";",$stack);
	$file=fopen("../editor/repository/".$temp[0].".txt","w");
	fwrite($file,$join);
	fclose($file);
	$im=imagecreate(1,1);
	imagecolorallocate($im,0,0,0);
	imagejpeg($im);
?>