Essential.Core.bind = function(eventName, callback, nodeList) {
  var i = -1;

  while(nodeList[i++]) {
    nodeList[i].addEventListener(eventName, callback);
  }
};
