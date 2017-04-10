<?php
	header("Content-type:image/jpeg");
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	extract($_GET);
	$temp=explode("/",$username);
	$f=file_get_contents("../editor/repository/".$temp[0]."-Auth.txt");
	$ftemp=explode(";",$f);
	$stack=array();
	foreach($ftemp as $existingfile){
		if($existingfile!=$temp[1])
			array_push($stack,$existingfile);
	}
	$join=implode(";",$stack);
	$file=fopen("../editor/repository/".$temp[0]."-Auth.txt","w");
	fwrite($file,$join);
	fclose($file);
	sleep(5);
	$im=imagecreate(1,1);
	imagecolorallocate($im,0,0,0);
	imagejpeg($im);
?>