<?php
	$f=file_get_contents("../editor/repository/repolist.txt");
	extract($_GET);
	$repolist=explode(";",$f);
	foreach($repolist as $reponame){
		$reponame=explode(":",$reponame)[1];
		if($reponame==$repo){
			echo "true";
			exit(0);
		}
	}
	echo "false";
?>