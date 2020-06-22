$('#body').toggleClass(localStorage.toggled);

function darkLight() {
  /*DARK CLASS*/
  if (localStorage.toggled != 'dark') {
    $('#body, p, #bs-canvas-right').toggleClass('dark', true);
    localStorage.toggled = "dark";
     
  } else {
    $('#body, p, #bs-canvas-right').toggleClass('dark', false);
    localStorage.toggled = "";
  }
}

/*Gömlülü Panel Hareketi*/

jQuery(document).ready(function($){
	var bsDefaults = {
			offset: false,
			overlay: true,
			width: '300px'		
		},
		bsMain = $('.bs-offset-main'),
		bsOverlay = $('.bs-canvas-overlay');	
	
	$('[data-toggle="canvas"][aria-expanded="false"]').on('click', function(){
		var canvas = $(this).data('target'),
			opts = $.extend({}, bsDefaults, $(canvas).data()),
			prop = $(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left';
		
		if(opts.width === '100%')
			opts.offset = false;
		
		$(canvas).css('width', opts.width);
		if(opts.offset && bsMain.length)			
			bsMain.css(prop, opts.width);		
		
		$(canvas + ' .bs-canvas-close').attr('aria-expanded', "true");
		$('[data-toggle="canvas"][data-target="' + canvas + '"]').attr('aria-expanded', "true");
		if(opts.overlay && bsOverlay.length)
			bsOverlay.addClass('show');
		return false;
	});			
	
	$('.bs-canvas-close, .bs-canvas-overlay').on('click', function(){
		var canvas, aria;
		if($(this).hasClass('bs-canvas-close')) {
			canvas = $(this).closest('.bs-canvas');
			aria = $(this).add($('[data-toggle="canvas"][data-target="#' + canvas.attr('id') + '"]'));
			if(bsMain.length)
				bsMain.css(($(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left'), '');	
		} else {
			canvas = $('.bs-canvas');
			aria = $('.bs-canvas-close, [data-toggle="canvas"]');
			if(bsMain.length)
				bsMain.css({'margin-left': '', 'margin-right': ''});
		}
		canvas.css('width', '');
		aria.attr('aria-expanded', "false");
		if(bsOverlay.length)	
			bsOverlay.removeClass('show');		
		return false;
	});
	
});

/*Yazı Boyut Seçimi*/

var selectedSize = '';

function fontSize(selectTag) {
  var listValue = selectTag.options[selectTag.selectedIndex].text;
  selectedSize = listValue;
  setFontSize(listValue);
}

function setFontSize(value) {
  document.querySelector("#makale").style.fontSize = value;
}

function saveFont(){
  localStorage.setItem('fontSize', selectedSize);
}

var button = document.querySelector('#save');
button.addEventListener('click', function(evt) {
  evt.preventDefault();
  saveFont();
}, false);

if(localStorage.getItem('fontSize')) {
  var storedSize = localStorage.getItem('fontSize');
  setFontSize(storedSize);
}
    
