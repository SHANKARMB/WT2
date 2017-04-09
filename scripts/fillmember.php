<?php
	extract($_GET);
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	$repotemp=explode("/",$repo);
	$f=file_get_contents("../editor/repository/".$repotemp[0]."-Auth.txt");
	$g=file_get_contents("../editor/repository/users.txt");
	$ftemp=explode(";",$f);
	$gtemp=explode(";",$g);
	$final=array();
	foreach($gtemp as $users){
		$usertemp=explode(":",$users);
		$flag=0;
		foreach($ftemp as $authuser){
			if($usertemp[0]==$authuser || $usertemp[0]==$repotemp[1]){
				$flag=$flag+1;
			}
		}
		if($flag==0)
			array_push($final,$usertemp[0]);
	}
	$join=implode(";",$final);
	echo $join;
?>