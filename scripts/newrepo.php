<?php
	extract($_GET);
	$temp=explode(":",$repo);
	$file=fopen("../editor/repository/repolist.txt","a");
	fwrite($file,';'.$repo);
	fclose($file);
	$reponame=$temp[1];
	mkdir("../editor/repository/".$reponame);
	$file=fopen("../editor/repository/".$reponame.".txt", 'w');
	fclose($file);
	$file=fopen("../editor/repository/".$reponame."-Auth.txt", 'w');
	fclose($file);
?>