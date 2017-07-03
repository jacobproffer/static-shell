const body = $('html, body');
const hamburger = $('.hamburger');
const mainNavigation = $('.main-nav');

hamburger.click(function() {
	mainNavigation.toggleClass('nav-open');
	$(this).toggleClass('navOpen');
	body.toggleClass('body-modal-open');
	body.toggleClass('disable-scrolling');
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
