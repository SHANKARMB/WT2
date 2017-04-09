<?php
	extract($_GET);
	$inputcontent=explode(":",$filename);
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	if(file_get_contents("../editor/repository/".$inputcontent[0].".txt")==""){
		$file=fopen("../editor/repository/".$inputcontent[0].".txt","a");
		fwrite($file,$inputcontent[1]);
		fclose($file);
	}
	else{
		$file=fopen("../editor/repository/".$inputcontent[0].".txt","a");
		fwrite($file,';'.$inputcontent[1]);
		fclose($file);
		chmod("../editor/repository/".$inputcontent[0].".txt"	, 0777);
	}
	$file=fopen("../editor/repository/".$inputcontent[0]."/".$inputcontent[1], 'w');
	fclose($file);
	chmod("../editor/repository/".$inputcontent[0]."/".$inputcontent[1], 0777);
?>