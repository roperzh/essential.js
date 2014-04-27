// Crawl
//------
//
// Scans the DOM looking for behaviors
//
// Return `Array<Object>` an array of objects with the behavior name as
// a key and the DOM node as a value
//
// **Example**
//
// ```html
// <div behavior="carousel"></div>
// ```
//
// ```javascript
// Essential.Core.crawl();
//
// // => [{ 'carousel': <HTMLDivElement> }]
// ```

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
