<?php
	$f=file_get_contents("../editor/repository/users.txt");
	extract($_GET);
	$users=explode(";",$f);
	foreach($users as $user){
		$user=explode(":",$user)[0];
		if($user==$username){
			echo "true";
			exit(0);
		}
	}
	echo "false";
?>