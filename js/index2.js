(function() {
	'use strict';

	const NAV_FADE = 200;
	var $headerNav = $('.header-nav-wrapper ul');
	var $close = $('.close');
	var activeIdx;
	var $activePage;
	var $activeBg;
	var $lowerNav = $('#lower-nav');
	var $homeBg = $('.background.home');

	// Using ES6 cleaner object notation, may need to change for friendlier backward compatability
	var subpage = {
		init(options) {
			this.active = false;
			this.page = options.page;
			this.hoverTrigger = options.hoverTrigger;
			this.background = options.background;
			this.clickTrigger = options.clickTrigger;
			this.bindEvents();
		},
		bindEvents() {
			this.hoverTrigger.hover(this.fadeInBg.bind(this), this.fadeOutBg.bind(this));	  		 				 
	  		$lowerNav.hover(function() { $homeBg.css({opacity: 0}); }, function() { $homeBg.css({opacity: 1}); });
			this.clickTrigger.on('click', this.raise.bind(this));
			$close.on('click', this.lower.bind(this));
		},
		fadeInBg() {
			this.background.css({'opacity': 1});	
		},
		fadeOutBg() {
			if(!this.active) {  // Only fades on the BG if the subpage is not showing
				this.background.css({'opacity': 0});
			}
		},
		raise() {
			if(!this.active) {
				if($activePage) {
					$activePage.css({'top': '105%'});  // Lower previous active subpage
				}
				$activePage = this.page; 
				$headerNav.fadeIn(NAV_FADE);
				if($activeBg) {
					$activeBg.css({'opacity': 0})
				}
				$activeBg = this.background;
				$activeBg.css({'opacity': 1});
				$activePage.css({'top': '0%'});
				this.active = true;
			}
		},
		lower() {
			if(this.active) {
				this.active = false;
				$activeBg.css({'opacity': 0});
				$activeBg = null;
				$activePage.css({'top': '105%'});
				$activePage = null;
				$headerNav.fadeOut(NAV_FADE);
			}
		}
	}

	var about = Object.create(subpage);
	about.init({
		page: $('#about'),
		hoverTrigger: $('.about-hover'),
		background: $('.background.about'),
		clickTrigger: $('.about-launch')
	});
	
	var work = Object.create(subpage);
	work.init({
		page: $('#work'),
		hoverTrigger: $('.work-hover'),
		background: $('.background.work'),
		clickTrigger: $('.work-launch')
	});

	var contact = Object.create(subpage);
	contact.init({
		page: $('#contact'),
		hoverTrigger: $('.contact-hover'),
		background: $('.background.contact'),
		clickTrigger: $('.contact-launch')
	});

})();





