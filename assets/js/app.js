// Variables
var body = $('html, body'),
		hamburger = $('.hamburger'),
		mainNavigation = $('.main-nav'),
		mainHeader = $('.main-header'),
		links = $('a[href*="#"]'),
		headerHeight = mainHeader.outerHeight();

// Mobile menu function
hamburger.click(function() {
	mainNavigation.toggleClass('nav-open');
	$(this).toggleClass('navOpen');
	mainHeader.toggleClass('open');
	body.toggleClass('body-modal-open');
	body.toggleClass('disable-scrolling');
});

/*
	 If a user clicks an anchor link in
	 the mobile menu that is on the same page
*/
links.click(function() {
	mainNavigation.removeClass('nav-open');
	mainHeader.removeClass('open');
	hamburger.removeClass('navOpen');
	body.removeClass('body-modal-open');
	body.removeClass('disable-scrolling');
});

// Headroom.js settings and functions
mainHeader.headroom({
  offset    : headerHeight,
  tolerance   : { up:10, down:10 },
  classes : {
    pinned   : "pinned",
    unpinned : "unpinned",
    top      : "onTop",
    bottom   : "onBottom",
    notTop   : "scrolled"
  },
	onUnpin : function() {
		if ( mainHeader.hasClass('open') ) {
			mainHeader.removeClass('unpinned');
		}
	},
  onTop : function() {
    mainHeader.removeClass('pinned');
  }
});

/*
	 Removes ability to scroll background
	 content on iOS when a modal is open.
*/
document.ontouchmove = function ( event ) {
	var isTouchMoveAllowed = true, target = event.target;
	while ( target !== null ) {
    if ( target.classList && target.classList.contains( 'disable-scrolling' ) ) {
	    isTouchMoveAllowed = false;
	    break;
    }
	  target = target.parentNode;
	}
	if ( !isTouchMoveAllowed ) {
	  event.preventDefault();
	}
};
