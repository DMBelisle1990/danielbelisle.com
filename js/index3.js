(function() {

	const NAV_FADE = 200;
	const GREY = '#333';
	const BLUE = '#1a75ff';
	const PURPLE = '#a64dff';
	const BROWN = '#994d00';
	const ORANGE = '#FAAC42'

	/*
	 * DOM Cache
	 */

	// Hover triggers
	var $aboutHover = $('.about-hover');
	var $workHover = $('.work-hover');
	var $contactHover = $('.contact-hover');

	// Click triggers
	var $aboutlaunch = $('.about-launch');
	var $worklaunch = $('.work-launch');
	var $contactlaunch = $('.contact-launch');

	// Backgrounds
	var $homeBg = $('.background.home');
	var $aboutBg = $('.background.about');
	var $workBg = $('.background.work');
	var $contactBg = $('.background.contact');

	// Subpages
	var $about = $('#about');
	var $work = $('#work');
	var $contact = $('#contact');

	var activatorClicked = false;

	/*
	 * HOVER EFFECTS
	 */

	function set_hover_effects($activator, $background) {

		$activator.on('mouseover', function() {

			$homeBg.css({'opacity': 0});
			$background.css({'opacity': 1});

		}).on('mouseout', function() {

			if(!activatorClicked) {
				$background.css({'opacity': 0});
				$homeBg.css({'opacity': 1});
			}

		});

	}

	set_hover_effects($aboutHover, $aboutBg);
	set_hover_effects($workHover, $workBg);
	set_hover_effects($contactHover, $contactBg);


	/*
	 * CLICK EFFECTS
	 */

	function set_click_effects($activator, $page, $background) {
		$activator.on('click', function() {

			activatorClicked = true;


			// If the show class is present, drop the page and remove the show class from it
			if($('.show').length) {
				$('.show').css({'top': '105%'});
				$('.show').toggleClass('show');
			}

			$page.css({'top': '0%'});
			$page.toggleClass('show');
			$('.header-nav-wrapper ul').fadeIn(NAV_FADE);

			// Backgrounds set here
			$('.active').css({'opacity': 0});
			$('.active').toggleClass('active');
			$background.toggleClass('active');
			$background.css({'opacity': 1});

		});
	}

	set_click_effects($aboutlaunch, $about, $aboutBg);
	set_click_effects($worklaunch, $work, $workBg);
	set_click_effects($contactlaunch, $contact, $contactBg);

	$('.close').on('click', function() {
		
		activatorClicked = false;
		$('.active').css({'opacity': 0});
		$('.active').toggleClass('active');
		$homeBg.toggleClass('active');
		$homeBg.css({'opacity': 1});
		$('.show').css({'top': '105%'});
		$('.show').toggleClass('show');
		$('.header-nav-wrapper ul').fadeOut(NAV_FADE);

	});


})();





