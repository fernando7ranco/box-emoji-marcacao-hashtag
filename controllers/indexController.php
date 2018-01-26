<?php
	require_once "functions/functions.php";
	
	$arquivo = "database.txt";
	
	$texto = file_get_contents ($arquivo);
	
	if($_SERVER['REQUEST_METHOD'] == 'POST' and $_POST['texto']){
	
		$texto = $_POST['texto'] . '<br>' . $texto;
		
		file_put_contents($arquivo, $texto);
	}
			
	
	$texto = marcacoes($texto);
	
	$texto = emoticons($texto, false);
	
?>
