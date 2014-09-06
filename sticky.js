angular.module('homeloan-ui').directive('sticky', function() {
 
  // Define cross-browser method to get pageYOffset
  // https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
  var getScrolledOffset;
  var supportPageOffset = window.pageYOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
 
  switch (true) {
    case supportPageOffset:
      getScrolledOffset = function() {
        return window.pageYOffset;
      };
      break;
    case isCSS1Compat:
      getScrolledOffset = function() {
        return document.documentElement.scrollTop;
      };
      break;
    default:
      getScrolledOffset = function() {
        return document.body.scrollTop;
      };
  }
 
 
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      var isSticked = false;
 
      // Return the top position of the element
      // Note: uses placeholder if element is already sticky
      function getElementAbsoluteTop() {
        var referenceElement = isSticked ? placeholder[0] : element[0];
        return referenceElement.getBoundingClientRect().top + getScrolledOffset();
      }
 
      // Gets element height, to be used to create a same-sized placeholder
      function getElementHeight() {
        return element[0].getBoundingClientRect().height;
      }
 
      // Get threshold under which the element should become sticky
      var threshold = getElementAbsoluteTop();
      var placeholder = angular.element('<div></div>');
 
      // Update threshold and placeholder size on resize to take media-queries into account
      angular.element(window).on('resize', function() {
        threshold = getElementAbsoluteTop();
        placeholder.css('height', getElementHeight() + 'px');
      });
 
      angular.element(window).on('scroll', function() {
        var shouldStick = getScrolledOffset() > threshold;
 
        // We stop if nothing to change
        if (isSticked === shouldStick) {
          return;
        }
        isSticked = shouldStick;
 
        // We put the element sticky and replace it with a placeholder
        if (shouldStick) {
          element.after(placeholder.css('height', getElementHeight() + 'px'));
          element.addClass('sticky');
          return;
        }
 
        // We unstick the element
        placeholder.remove(); // Should use .detach() in 1.3
        element.removeClass('sticky');
      });
    }
  };
});
