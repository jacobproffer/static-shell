const body = $('html, body');
const hamburger = $('.hamburger');
const mainNavigation = $('.main-nav');
const mainHeader = $('.main-header');
const headerHeight = mainHeader.outerHeight();

hamburger.click(function() {
	mainNavigation.toggleClass('nav-open');
	$(this).toggleClass('navOpen');
	mainHeader.toggleClass('open');
	body.toggleClass('body-modal-open');
	body.toggleClass('disable-scrolling');
});

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
Removes ability to scroll background content on iOS
when a modal is open. Needs to be converted to jQuery still
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
