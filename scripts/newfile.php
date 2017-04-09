<?php
	extract($_GET);
	$inputcontent=explode(":",$filename);
	if(file_get_contents("../editor/repository/".$inputcontent[0].".txt")==""){
		$file=fopen("../editor/repository/".$inputcontent[0].".txt","a");
		fwrite($file,$inputcontent[1]);
		fclose($file);
	}
	else{
		$file=fopen("../editor/repository/".$inputcontent[0].".txt","a");
		fwrite($file,';'.$inputcontent[1]);
		fclose($file);
	}
	$file=fopen("../editor/repository/".$inputcontent[0]."/".$inputcontent[1], 'w');
	fclose($file);
?>