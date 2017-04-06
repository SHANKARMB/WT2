<?php
	extract($_GET);
	$inputcontent=explode(":",$filename);
	$f=file_get_contents("../data/".$inputcontent[0].".txt");
	$repocontent=explode(";",$f);
	foreach($repocontent as $existingfile){
		if($existingfile==$inputcontent[1]){
			echo "true";
			exit(0);
		}
	}
	echo "false";
?>