<?php
	extract($_GET);
	$temp=explode(":",$repo);
	$file=fopen("../data/repolist.txt","a");
	fwrite($file,';'.$repo);
	fclose($file);
	$reponame=$temp[1];
	mkdir("../data/".$reponame);
	$file=fopen("../data/".$reponame.".txt", 'w');
	fclose($file);
	$file=fopen("../data/".$reponame."-Auth.txt", 'w');
	fclose($file);
?>