<?php
	extract($_GET);
	$inputcontent=explode(":",$filename);
	$file=fopen("../data/".$inputcontent[0].".txt","a");
	fwrite($file,';'.$inputcontent[1]);
	fclose($file);
	$file=fopen("../data/".$inputcontent[0]."/".$inputcontent[1], 'w');
	fclose($file);
?>