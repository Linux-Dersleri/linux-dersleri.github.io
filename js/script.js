/*Koyu Tema*/
let darkMode = localStorage.getItem('darkMode');

const enableDarkMode = () => {
	document.body.classList.add('dark-mode');
	localStorage.setItem('darkMode','enable');
}

const disableDarkMode = () => {
	document.body.classList.remove('dark-mode');
	localStorage.setItem('darkMode',null);
}

if(darkMode === 'enable'){
	enableDarkMode();
	darkMode.checked = true;
	
}

function tema() {
	darkMode = localStorage.getItem('darkMode');
	if(darkMode !== 'enable') enableDarkMode();
	else disableDarkMode();
}


/*Gömülü Panel Hareketi*/

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

    
