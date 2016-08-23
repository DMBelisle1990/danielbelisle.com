(function() {
	'use strict';

	const NAV_FADE = 200;
	var $headerNav = $('.header-nav-wrapper ul');
	var $close = $('.close');
	var activeIdx;
	var $activePage;
	var $activeBg;

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
				// Lower previous active subpage
				if($activePage) {
					$activePage.css({'top': '105%'});
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
		}

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

})();





