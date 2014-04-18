// Crawler
//--------
//
// This function is in charge to scan the DOM looking for behaviors
//
// Returns `Array<Object>` an array of objects containing the behavior name as
// a key and the DOM node as a value

Essential.Core.crawler = function () {
  var all = document.querySelectorAll("[data-behavior], [behavior]"),
    i = -1,
    result = {};

  while (all[++i]) {
    var current = all[i];
    result[current.getAttribute("data-behavior") || current.getAttribute("behavior")] = current;
  }

  return result;
};
