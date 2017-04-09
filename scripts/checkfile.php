<?php
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	extract($_GET);
	$inputcontent=explode(":",$filename);
	$f=file_get_contents("../editor/repository/".$inputcontent[0].".txt");
	$repocontent=explode(";",$f);
	foreach($repocontent as $existingfile){
		if($existingfile==$inputcontent[1]){
			echo "true";
			exit(0);
		}
	}
	echo "false";
?>