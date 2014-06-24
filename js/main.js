(function() {
	jQuery(document).ready(function($) {

		/****************************
			Variables
		****************************/
		var winHeight 		= $(window).height(),
			winWidth 		= $(window).width();

		

		// Set title container to 100% height			
		(window.resize = function() {
			$('.main').height(winHeight+'px');
		})();

	});

})();