Essential.Core.bind = function (eventName, callback, nodeList) {
  var i = -1;

  while (nodeList[++i]) {
    var currentElement = nodeList[i];

    if (currentElement.addEventListener) {
      nodeList[i].addEventListener(eventName, callback);
    } else {
      currentElement.attachEvent("on" + eventName, callback);
    }
  }
};
