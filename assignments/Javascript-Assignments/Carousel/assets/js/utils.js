var getStyle = function (element, style) {
  return parseInt(window.getComputedStyle(element).getPropertyValue(style));
};