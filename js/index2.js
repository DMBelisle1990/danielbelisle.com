(function() {
	'use strict';

	const NAV_FADE = 200;
	var $headerNav = $('.header-nav-wrapper ul');
	var $close = $('.close');
	// var $lowerNav = $('#lower-nav .subpage-launch');
	// var $upperNav = $('#upper-nav .subpage-launch');
	var activeIdx;
	var prevPage;
	var prevBg;

	class Subpage {

		constructor(options) {
			this.page = options.page;
			this.hoverTrigger = options.hoverTrigger;
			this.background = options.background;
			this.clickTrigger = options.clickTrigger;
			this.init();
		}

		init() {
			this.active = false;
			this.bindEvents();
		}

		bindEvents() {
			this.hoverTrigger.on('mouseover', this.fadeInBg.bind(this))
	  		 				 .on('mouseout', this.fadeOutBg.bind(this));

			this.clickTrigger.on('click', this.raise.bind(this));
			$close.on('click', this.lower.bind(this));
		}

		fadeInBg() {
			this.background.css({'opacity': 1});	
		}

		fadeOutBg() {
			if(!this.active) {
				this.background.css({'opacity': 0});
			}
		}

		raise() {
			if(!this.active) {
				// Drop visible subpage
				var $show = $('.show');
				if($show.length) {
					$show.css({'top': '105%'});
					$show.toggleClass('show');
				}

				// fade in header nav
				$headerNav.fadeIn(NAV_FADE);

				var $active = $('.active');
				$active.css({'opacity': 0});
				$active.toggleClass('active');

				this.background.toggleClass('active')
							   .css({'opacity': 1});
				this.page.css({'top': '0%'});
				this.active = true;
			}
		}

		lower() {
			if(this.active) {
				this.active = false;
				$('.active').css({'opacity': 0});
				$('.active').toggleClass('active');
				$('.show').css({'top': '105%'});
				$('.show').toggleClass('show');
				$('.header-nav-wrapper ul').fadeOut(NAV_FADE);
			}
		}

	}

	// Each selector is only called twice so this suffices as a DOM Cache
	var about = new Subpage({
		page: $('#about'),
		hoverTrigger: $('.about-hover'),
		background: $('.background.about'),
		clickTrigger: $('.about-launch')
	});

	var work = new Subpage({
		page: $('#work'),
		hoverTrigger: $('.work-hover'),
		background: $('.background.work'),
		clickTrigger: $('.work-launch')
	});

	var contact = new Subpage({
		page: $('#contact'),
		hoverTrigger: $('.contact-hover'),
		background: $('.background.contact'),
		clickTrigger: $('.contact-launch')
	});


	// Testing stuff down here

	// $('#lower-nav .subpage-launch, #upper-nav .subpage-launch').on('click', function() {
	// 	if(activeIdx !== undefined) {
	// 		$upperNav[activeIdx].classList.remove('active');
	// 	}
	// 	activeIdx = $(this).index();
	// 	$lowerNav[activeIdx].classList.add('active');
	// });




})();





