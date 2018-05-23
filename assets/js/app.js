// Variables
var body = $("html, body");
var mobileMenu = $(".mobile-nav-button");
var mainNavigation = $(".main-nav");
var mainHeader = $(".main-header");
var links = $('a[href*="#"]');
var headerHeight = mainHeader.outerHeight();

// Mobile menu function
mobileMenu.click(function() {
  mainNavigation.toggleClass("nav-open");
  $(this).toggleClass("nav-open");
  mainHeader.toggleClass("open");
  body.toggleClass("body-modal-open");
  body.toggleClass("disable-scrolling");
});

/*
	 If a user clicks an anchor link in
	 the mobile menu that is on the same page
*/
links.click(function() {
  mainNavigation.removeClass("nav-open");
  mainHeader.removeClass("open");
  mobileMenu.removeClass("nav-open");
  body.removeClass("body-modal-open");
  body.removeClass("disable-scrolling");
});

/*
	 Removes ability to scroll background
	 content on iOS when a modal is open.
*/
document.ontouchmove = function(event) {
  var isTouchMoveAllowed = true,
    target = event.target;
  while (target !== null) {
    if (target.classList && target.classList.contains("disable-scrolling")) {
      isTouchMoveAllowed = false;
      break;
    }
    target = target.parentNode;
  }
  if (!isTouchMoveAllowed) {
    event.preventDefault();
  }
};
