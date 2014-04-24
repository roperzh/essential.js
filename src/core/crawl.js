// Crawler
//--------
//
// This function is in charge to scan the DOM looking for behaviors
//
// Returns `Array<Object>` an array of objects containing the behavior name as
// a key and the DOM node as a value

Essential.Core.crawl = function () {
  var all = document.querySelectorAll("[data-behavior], [behavior]"),
    i = -1,
    result = {};

  while (all[++i]) {
    var currentElement = all[i],
      rawBehaviors = currentElement.getAttribute("data-behavior") || currentElement.getAttribute("behavior"),
      behaviorsList = rawBehaviors.split(" "),
      j = -1;

    while (behaviorsList[++j]) {
      result[behaviorsList[j]] = currentElement;
    }
  }

  return result;
};
