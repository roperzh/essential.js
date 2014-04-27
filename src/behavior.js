// Behavior
// --------
//
// Represents a behavior of some element or group of elements.
// The objetive is define a set of rules and events who
// can be associated to an element and reutilized later on
//
// When a behavior is defined, a hash of events must be defined too,
// and on initialization a DOM element must be provided
//
// **Example**
// ```javascript
// Carousel = Essential.Behavior.extend({
//   events: {
//     "click .next": "goToNextSlide"
//   },
//
//   goToNextSlide: function(e) {
//     //...
//   }
// });
//
// var carousel = Carousel.new(domElement);
// ```

Essential.Behavior = Proto.extend({
  constructor: function (domElement) {
    this.el = domElement;
    this.delegateEvents();
  },

  delegateEvents: function () {
    if (typeof this.events === "undefined") {
      return;
    };

    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    for (var key in this.events) {
      var method = this.events[key];

      var match = key.match(delegateEventSplitter);
      var eventName = match[1],
        selector = match[2],
        nodeList = selector ? this.el.querySelectorAll(selector) : [this.el];

      if (typeof this[method] === "undefined") {
        continue;
      };

      Essential.Core.bind(eventName, nodeList, this[method]);
    }
  }
});
