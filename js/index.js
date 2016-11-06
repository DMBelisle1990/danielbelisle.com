(function() {
	'use strict';

	const NAV_FADE = 200;
	var $headerInfo = $('.hide-on-home');
	var $socialIcons = $('header .social');
	var $activePage;
	var $lowerNav = $('#lower-nav');
	var $homeBg = $('.background.home');
	var subpageHidden = true;

	// Using ES6 cleaner object notation, may need to change for friendlier backward compatability
	var subpage = {

		init(options) {
			this.selector = options.selector;
			this.hoverTrigger = options.hoverTrigger;
			this.bg = options.bg;
			this.clickTrigger = options.clickTrigger;
			this.$close = options.selector.find($('.close'));
			this.bindEvents();
		},

		bindEvents() {
			this.hoverTrigger.hover(this.fadeInBg.bind(this), this.fadeOutBg.bind(this));
	  		$lowerNav.hover(function() {
	  			$homeBg.css({opacity: 0});
	  		}, function() {
	  			$homeBg.css({opacity: 1});
	  		});
			this.clickTrigger.on('click', this.togglePage.bind(this));
			this.$close.on('click', this.returnHome.bind(this));
		},

		fadeInBg() {
			this.bg.css({'opacity': 1});
		},

		fadeOutBg() {
			if(subpageHidden) {  // Only fades back to home BG if the subpage is hidden
				this.bg.css({'opacity': 0});
			}
		},

		togglePage() {
			subpageHidden = false;
			$headerInfo.fadeIn(NAV_FADE);
			if($activePage) {
				$activePage.lower();
			}
			$activePage = this;
			$activePage.raise();
		},

		raise() {
			this.bg.css({'opacity': 1});
			$socialIcons.css({'top': '-5px'});
			this.selector.css({'top': '0%'});
		},

		lower() {
			this.bg.css({'opacity': 0});
			$socialIcons.css({'top': 0});
			this.selector.css({'top': '105%'});
		},

		returnHome() {
			this.lower.call($activePage);
			subpageHidden = true;
			$headerInfo.fadeOut(NAV_FADE);
			$activePage = null;
		}
	}

	var about = Object.create(subpage);
	about.init({
		selector: $('#about'),
		hoverTrigger: $('.about-hover'),
		bg: $('.background.about'),
		clickTrigger: $('.about-launch')
	});

	var work = Object.create(subpage);
	work.init({
		selector: $('#work'),
		hoverTrigger: $('.work-hover'),
		bg: $('.background.work'),
		clickTrigger: $('.work-launch')
	});

	var contact = Object.create(subpage);
	contact.init({
		selector: $('#contact'),
		hoverTrigger: $('.contact-hover'),
		bg: $('.background.contact'),
		clickTrigger: $('.contact-launch')
	});

})();
