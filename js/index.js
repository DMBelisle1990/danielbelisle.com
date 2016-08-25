(function() {
	'use strict';

	const NAV_FADE = 200;
	var $headerNav = $('.header-nav-wrapper ul');
	var $close = $('.close');
	var activeIdx;
	var $activePage;
	var $lowerNav = $('#lower-nav');
	var $homeBg = $('.background.home');
	var subpageHidden = true;

	// Using ES6 cleaner object notation, may need to change for friendlier backward compatability
	var subpage = {
		init(options) {
			this.selector = options.selector;
			this.hoverTrigger = options.hoverTrigger;
			this.background = options.background;
			this.clickTrigger = options.clickTrigger;
			this.bindEvents();
		},
		bindEvents() {
			this.hoverTrigger.hover(this.fadeInBg.bind(this), this.fadeOutBg.bind(this));
  		$lowerNav.hover(function() {
  			$homeBg.css({opacity: 0});
  		}, function() {
  			$homeBg.css({opacity: 1});
  		});
			this.clickTrigger.on('click', this.raise.bind(this));
			$close.on('click', this.lower.bind(this));
		},
		fadeInBg() {
			this.background.css({'opacity': 1});
		},
		fadeOutBg() {
			if(subpageHidden) {  // Only fades back to home BG if the subpage is hidden
				this.background.css({'opacity': 0});
			}
		},
		togglePage() {
			subpageHidden = false;
		},
		raise() {
			subpageHidden = false;
			if($activePage) { // If a page is showing, lower it
				$activePage.selector.css({'top': '105%'});
				$activePage.background.css({'opacity': 0});
			}
			$activePage = this;

			$headerNav.fadeIn(NAV_FADE);

			// $activeBg = $activePage.background;
			$activePage.background.css({'opacity': 1});
			$activePage.selector.css({'top': '0%'});
		},
		lower() {
			subpageHidden = true;
			if($activePage) {
				$activePage.background.css({'opacity': 0});
				$activePage.selector.css({'top': '105%'});
			}

			$activePage = null;
			$headerNav.fadeOut(NAV_FADE);
		},
		close() {

		}
	}

	var about = Object.create(subpage);
	about.init({
		selector: $('#about'),
		hoverTrigger: $('.about-hover'),
		background: $('.background.about'),
		clickTrigger: $('.about-launch')
	});

	var work = Object.create(subpage);
	work.init({
		selector: $('#work'),
		hoverTrigger: $('.work-hover'),
		background: $('.background.work'),
		clickTrigger: $('.work-launch')
	});

	var contact = Object.create(subpage);
	contact.init({
		selector: $('#contact'),
		hoverTrigger: $('.contact-hover'),
		background: $('.background.contact'),
		clickTrigger: $('.contact-launch')
	});

})();
