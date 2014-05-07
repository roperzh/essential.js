var context = describe;

var setDocumentContents = function(fixture) {
  var path = "test/fixtures/" + fixture + ".html"
  document.body.innerHTML = __html__[path];
};

var Helper = {
  flag: 0,

  changeFlag: function () {
    Helper.flag++;
  }
};

var Events = {
  click: function () {
    clickEvent = document.createEvent("Event");
    clickEvent.initEvent('click', false, true);
    return clickEvent;
  },

  hover: function () {
    hoverEvent = document.createEvent("Event");
    hoverEvent.initEvent('hover', false, true);
    return hoverEvent;
  }
};

var customBehavior = Essential.Behavior.extend({
  events: {
    "click": "clickHandler",
    "click li": "customClickHandler",
    "hover": "notDefinedEvent"
  },

  clickHandler: function () {
    Helper.changeFlag();
  },

  customClickHandler: function () {
    Helper.changeFlag();
  }
});

var applyToAll = function (collection, callback, options) {
  var i = -1;

  while (collection[++i]) {
    collection[i][callback](options);
  }
};
