// Bind
// ----
//
// Binds an event to a node
//
// Param eventName[`String`] name of the event to be binded
//
// Param callback[`Function`] function to be called when the event is triggered
//
// Param nodeList[`NodeList`, `Array`] node elements to be binded
//
// **Example**
//
// ```javascript
// var nodeList = document.querySelectorAll("*");
//
// Essential.Core.bind("hover", nodeList, function() {
//   alert("hover!");
// });
//
// // If the hover event is triggered for any of the
// // elements in the nodeList the alert will appear
// ```

Essential.Core.bind = function(eventName, nodeList, callback) {
  var i = -1;

  while(nodeList[++i]) {
    var currentElement = nodeList[i];

    if(currentElement.addEventListener) {
      nodeList[i].addEventListener(eventName, callback);
    } else {
      currentElement.attachEvent("on" + eventName, callback);
    }
  }
};
