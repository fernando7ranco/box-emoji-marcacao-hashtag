<?php
	
function emoticons($texto,$condicao = true)
{
	$count = 0;
	for($i = 0 ; $i<= 16840; $i+= 20)
	{
		$count = sprintf( "%03d" ,$count);	
		
		if($condicao)
			$texto.= "<img src='img/fundoEmoji.png' style='background-position:100% -".$i."px;' id='emoticons' alt='[e$count]'>";
		else
			$texto = str_replace("[e$count]","<img src='img/fundoEmoji.png' style='background-position:100% -".$i."px;' id='emoticons'>",$texto);
		
		$count++;
	}
	return $texto;
}

function marcacoes($texto,$qual = null)
{
	if(substr_count($texto,'#') > 0)
	{
				
		if(is_numeric($qual) AND $qual == 0)
			$newv = "<a id='backgroudMarcacao' >#$1</a>";
		else
			$newv = "<a href='$1' id='backgroudMarcacao' target='_blanck'>#$1</a>";
		
		$texto = preg_replace("/#([A-Za-zÀ-ú0-9]+)/i", $newv,$texto);

		if(is_string($qual))
			 $texto = str_replace("<a href='".substr($qual,1)."' id='backgroudMarcacao' target='_blanck'>$qual</a>","<a id='backgroudMarcacao' >$qual</a>",$texto);
	}
	return $texto;
}
