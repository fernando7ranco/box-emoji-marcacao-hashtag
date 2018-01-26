$(function(){
	
	var selection = null;
	var range = null;
	var indentificador = null;
	
	$('body').delegate('#boxEditavelContenteditable','paste drop',function(e){
		
		var tipo = e.type
		var text = '';
		
		if(tipo == 'paste'){
			if(e.clipboardData || e.originalEvent.clipboardData) {
			  text = (e.originalEvent || e).clipboardData.getData('text/plain');
			}else if(window.clipboardData) {
			  text = window.clipboardData.getData('Text');
			}
		}else{
			if(e.dataTransfer || e.originalEvent.dataTransfer) {
			  text = (e.originalEvent || e).dataTransfer.getData('text/plain');
			}else if(window.dataTransfer) {
			  text = window.dataTransfer.getData('Text');
			}
			$(this).focus();
		}
		
		var max = parseInt($(this).attr('max'));
		var atual = parseInt($(this).text().length + ($(this).find('img').length*6));
		var limite = max - atual;
		text = text.substr(0, limite);
	
		
		if(document.queryCommandSupported('insertText')) {
		  document.execCommand('insertText', false, text);
		}else{
		  document.execCommand('paste', false, text);
		}
		
		var str = $(this).html(); 
		str = str.replace(/#([a-zA-Z\u00C0-\u00FF]+)/g,'<a id="backgroudMarcacao">#$1</a>');
		$(this).siblings('#boxEditavelPreVilTextEditavel').html(str);
		
		e.preventDefault();
		
	}).delegate('#boxEditavelContenteditable','focus',function(e){
	
		var atual = parseInt($(this).text().length + ($(this).find('img').length*6));
		if(!atual)
			$(this).text(' ');
		
	}).delegate('#boxEditavelContenteditable','keydown keyup',function(e){
	
		var max = parseInt($(this).attr('max'));
		var atual = parseInt($(this).text().length + ($(this).find('img').length*6));
		var str = $(this).html(); 
		$(this).parents('.localBoxEditavel').siblings('#localEmotELCaract').find('#limiteCaracteres').text(max-atual);
		
		if(atual < max){
			
			str = str.replace(/#([a-zA-Z\u00C0-\u00FF]+)/g,'<a id="backgroudMarcacao">#$1</a>');
			$(this).siblings('#boxEditavelPreVilTextEditavel').html(str);
			
		}else{
			var key = e.keyCode;
				
			if(key >=37 && key <=40 || key == 8)
				$(this).siblings('#boxEditavelPreVilTextEditavel').html(str);
			else
				return false;
		}
		
		if(!atual) $(this).text(' ');
		
	}).delegate('.overActiveScroll','mouseover',function(){
		
		$(this).scroll(function(){
			$(this).siblings('#boxEditavelPreVilTextEditavel').scrollTop($(this).scrollTop());
		}).removeClass();
		
	}).delegate('#boxEditavelContenteditable','blur',function(e){
		
		var cIrmao = $(this).siblings('#boxEditavelPreVilTextEditavel');
		var text = cIrmao.html();
		if(text.trim() == '')
			cIrmao.html("<font color='#d3d3d3' >"+$(this).attr('alt')+"</font>");

	}).delegate('#boxEditavelContenteditable','click keyup',function(e){
		
		selection = window.getSelection();
		range = selection.getRangeAt(0);
		indentificador = $(this).parents('.localBoxEditavel').attr('id');
		
	}).delegate('#figuarasEmotions img ','click',function(){
		
		var caminho = $(this).parents('#localEmotELCaract').siblings('.localBoxEditavel').find('#boxEditavelContenteditable');

		var atual = parseInt(caminho.text().length);
		var max = parseInt(caminho.attr('max'));
			
		if(atual < max){
			
			if(caminho.text().trim() == caminho.attr('alt').trim()) 
				caminho.html('');	
			
			var emoji = $(this).get(0).cloneNode();
			
			if( !range || indentificador != $(this).parents('#localEmotELCaract').siblings('.localBoxEditavel').attr('id'))
				caminho.append(emoji);
			else{
				range.deleteContents(emoji);        
				range.insertNode(emoji);  
				range.collapse(false);
				selection.removeAllRanges();
				selection.addRange(range);
			}
			var str = caminho.html();
			
			str = str.replace(/#([a-zA-Z\u00C0-\u00FF]+)/g,'<a id="backgroudMarcacao">#$1</a>');
			
			$(this).parents('#localEmotELCaract').siblings('.localBoxEditavel').find('#boxEditavelPreVilTextEditavel').html(str);
		}
	}).delegate('#btIconeEmoticon','click',function(){
		$(this).siblings('#localimgsemoticons').toggle('slow');
	}).click(function(){
		$("body #localimgsemoticons").hide();
	}).delegate('#figuarasEmotions','click',function(e){
		e.stopPropagation();
	});
	
	codeEmoticons = function(str){
		var result = str.replace(/<img([^>])+>/gi,
		 function (m, p) {
			 re = m.match(/(\[.*\])/g);
			 return re ? re : m
			}
		);	
		return result;
	};
	
	$('#boxEditavelTextarea').parents('form').submit(function(){
	
		var str = $('#boxEditavelContenteditable').html();
		
		str = codeEmoticons(str);
		
		var caminho = $('#boxEditavelTextoParaTextarea');
		
		caminho.html(str);
		
		$('textarea[name=texto]').val(caminho.text().trim());
	
	});
	
});