Essential.Behavior = Proto.extend({
  constructor: function (domElement) {
    this.el = domElement;
    this.delegateEvents();
  },

  delegateEvents: function () {
    if (typeof this.events === "undefined") return;

    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    for (var key in this.events) {
      var method = this.events[key];

      var match = key.match(delegateEventSplitter);
      var eventName = match[1],
        selector = match[2],
        nodeList = selector ? this.el.querySelectorAll(selector) : [this.el];

      if (typeof this[method] === "undefined") continue;
      Essential.Core.bind(eventName, this[method].bind(this), nodeList);
    }
  }
});
