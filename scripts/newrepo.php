<?php
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	extract($_GET);
	$temp=explode(":",$repo);
	$file=fopen("../editor/repository/repolist.txt","a");
	fwrite($file,';'.$repo);
	fclose($file);
	$reponame=$temp[1];
	mkdir("../editor/repository/".$reponame,0777);
	$file=fopen("../editor/repository/".$reponame.".txt", 'w');
	fclose($file);
	$file=fopen("../editor/repository/".$reponame."-Auth.txt", 'w');
	fclose($file);
?>