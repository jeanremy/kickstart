(function() {
	
	// jQuery(document).ready(function($) {

	// 	/****************************
	// 		Variables
	// 	****************************/
	// 	var winHeight 		= $(window).height(),
	// 		winWidth 		= $(window).width();

		

	// 	// Set title container to 100% height			
	// 	(window.resize = function() {
	// 		$('.main').height(winHeight+'px');
	// 	})();

	// });

	$(document).ready(function($) {

		App.init();

		var currentSection = 0;
		
	    $('#fullpage').fullpage({
	        //Navigation
	        anchors:['home', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'wishes'],
			scrollOverflow:true,
			scrollBar: false,
			animateAnchor: false,
			onLeave: function(index, nextIndex, direction){

				if (direction == 'down'){
					var loadedSection = $('.section').eq(index -1);
				}
				else if(direction == 'up'){
					var loadedSection = $('.section').eq(nextIndex);
				}
		            
	            App[loadedSection.attr('data-animate')].animateOut(loadedSection, direction);	
				
				
			},
			afterLoad: function(anchorLink, index){
	            var loadedSection = $(this);
	            var direction = currentSection > index ? 'up':'down';
	            
	            App[loadedSection.attr('data-animate')].animateIn(loadedSection, direction);
	            currentSection = index;

	        },
			afterRender: function(){

	            $('#loader').hide(400);
	            $('#fullpage').show();
	        }
	       
	    });
	});

	var App = {

		init: function() {
			var line = CSSRulePlugin.getRule(".home__content:after"),
				scroll = CSSRulePlugin.getRule(".home .container:after");
				titleline = CSSRulePlugin.getRule(".month__title:after"),
				frame = CSSRulePlugin.getRule(".month__img:before");

			TweenMax.to(line, 0, {cssRule:{opacity: 0}});
			TweenMax.to(scroll, 0, {cssRule:{opacity: 0}});
			TweenMax.to(titleline, 0, {cssRule:{scale: 0}});
			TweenMax.to(frame, 0, {cssRule:{x: 0, y: 0}});
			TweenMax.to($('.fade'), 0, {autoAlpha: 0});

		},

		home: {

			animateIn: function(target, direction) {

				var tl = new TimelineMax({paused:true}),
					tweens = [],
					line = CSSRulePlugin.getRule(".home__content:after"),
					scroll = CSSRulePlugin.getRule(".home .container:after"); 
					                                                          //
				tweens.push(TweenMax.fromTo($('.home__title .fade'), .4, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}));
				tweens.push(TweenMax.fromTo($('.home__content .fade'), .4, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}));				
				tweens.push(TweenMax.to(line, .3, {cssRule:{opacity: 1}}));
				tweens.push(TweenMax.to(scroll, .3, {cssRule:{opacity: 1}}));
				
				tl.add(tweens, '+=0', 'start', .2);
				tl.play();

			},

			animateOut: function(target, direction) {

				var line = CSSRulePlugin.getRule(".home__content:after"),
					scroll = CSSRulePlugin.getRule(".home .container:after");

				TweenMax.to(line, .3, {cssRule:{opacity: 0}});
				TweenMax.to(scroll, .3, {cssRule:{opacity: 0}});
				TweenMax.to(target.find('.fade'), .3, {autoAlpha: 0});

			}
		},

		month: {

			animateIn: function(target, direction) {
				var imgTl = new TimelineMax({paused:true}),
					textTl = new TimelineMax({paused:true}),
					textTweens = [],
					imgTweens = [],
					line = CSSRulePlugin.getRule(".month__title:after"),
					frame = CSSRulePlugin.getRule(".month__img:before"); 

				if(direction === 'down') {
					textTweens.push(TweenMax.fromTo(target.find('.month__number'), .3, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}));
					textTweens.push(TweenMax.fromTo(target.find('.month__title span'), .3, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}));
					imgTweens.push(TweenMax.fromTo(target.find('.month__img'), .5, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}));
					
				}
				else {
					textTweens.push(TweenMax.fromTo(target.find('.month__number'), .3, {y: 20, autoAlpha: 0}, {y: 0, autoAlpha: 1}));
					textTweens.push(TweenMax.fromTo(target.find('.month__title span'), .3, {y: 20, autoAlpha: 0}, {y: 0, autoAlpha: 1}));
					imgTweens.push(TweenMax.fromTo(target.find('.month__img'), .5, {y: 20, autoAlpha: 0}, {y: 0, autoAlpha: 1}));
				}

				textTweens.push(TweenMax.to(line, .3, {cssRule:{scale: 1}}));
				textTweens.push(TweenMax.to(target.find('.month__legend'), .3, {autoAlpha: 1}));
				textTl.add(textTweens, '+=0', 'start', .1);

				imgTweens.push(TweenMax.to(frame, .3, {cssRule:{x: -46, y: -56}}));
				imgTl.add(imgTweens, '+=0', 'start', .1);


				textTl.play();
				imgTl.delay(.5).play();
			},

			animateOut: function(target, direction) {
				var line = CSSRulePlugin.getRule(".month__title:after"),
					frame = CSSRulePlugin.getRule(".month__img:before");

				/* Set opacity 0*/
				TweenMax.to(line, 0, {cssRule:{scale: 0}});
				TweenMax.to(frame, .3, {cssRule:{x: 0, y: 0}});
				TweenMax.to(target.find('.fade'), .3, {autoAlpha: 0});
			}
		},

		wishes: {

			animateIn: function(target, direction) {
				var tl = new TimelineMax({paused:true}),
					tweens = [];

				if(direction === 'up') {
					tweens.push(TweenMax.staggerFromTo(target.find('.fade'), .4, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}, .15));
				}
				else {
					tweens.push(TweenMax.staggerFromTo(target.find('.fade'), .4, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}, .15));
				}
				tl.add(tweens);
				tl.play();
			},

			animateOut: function(target, direction) {
				TweenMax.to(target.find('.fade'), .3, {autoAlpha: 0});
			}
		}

	}

})(jQuery);