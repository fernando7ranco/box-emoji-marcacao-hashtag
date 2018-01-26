<?php
	require_once "controllers/indexController.php";
?>

<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8">
		
		<title>textarea com hashtag e emoji</title>
		
		<link  rel="stylesheet"  href="css/css.css">
		
	</head>
	
	<body>
		<div class="container">
		
			<form method="POST">
			
				<div class="box">
					<div class='localBoxEditavel'>
						
						<div id='boxEditavel'>
							<div id='boxEditavelPreVilTextEditavel'><font color='#d3d3d3' >digite um texto</font></div>
							<div id='boxEditavelContenteditable' contenteditable='true' class='overActiveScroll' max='999' alt='digite um texto'></div>
							<div id='boxEditavelTextoParaTextarea'></div>
							<textarea id='boxEditavelTextarea' name='texto' ></textarea>
						</div>
						
					</div>
					
					<div id='localEmotELCaract'>
						<div id='figuarasEmotions'>
							<div id='btIconeEmoticon' title='anexar emoticons'></div>
							<div id='localimgsemoticons'><div><?=emoticons(null);?></div></div>
						</div>
						<div id='limiteCaracteres' title='limite de caracteres'>999</div>
					</div>
				</div>
				<p>
					<button type="submit">submit</button>
				</p>
			</form>
			<p style="white-space: pre-wrap;"><?=$texto?></p>
		</div>
		
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/js.js"></script>
	</body>
</html>
