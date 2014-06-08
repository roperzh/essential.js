// Behavior
// --------
//
// Represents a behavior of some element or group of elements.
// The objetive is define a set of rules and events which
// can be associated to an element and reutilized later on
//
// When a behavior is defined, a hash of events must be defined too,
// and on initialization a DOM element must be provided
//
// Also you can define an `init` function, which is always called when the
// behavior is initialized
//
// **Example**
// ```javascript
// Carousel = Essential.Behavior.extend({
//   events: {
//     "click .next": "goToNextSlide"
//   },
//
//  init: function() {
//    // Called on behavior initialization
//  },
//
//   goToNextSlide: function(e) {
//     //...
//   }
// });
//
// var carousel = Carousel.new(domElement);
// ```

Essential.Behavior = Proto.extend({
  constructor: function(domElement, lateStart) {
    this.el = domElement;

    // A behavior can be initialized without attaching events with the `lateStart`
    // flag, if it is present the methods `delegateEvents` and `ìnit` are omitted
    // but can be called later with `start`
    //
    // **Example**
    // ```javascript
    // carousel = new Carousel(domElement, true);
    // // delegateEvents and init not called
    //
    // carousel.start();
    // // delegateEvents and init called
    // ```

    if(!lateStart) {
      this.start();
    }
  },

  start: function() {
    this.delegateEvents();
    this.listenChannels();

    if(typeof this.init === "function") {
      this.init();
    }
  },

  // Delegate Events
  // ---------------
  //
  // Delegates events declared in `this.events`, using `this.el` as a context

  delegateEvents: function() {
    Essential.Core.mapEvents.call(this, this.events, this.el);
  },

  // Listen Channels
  // ---------------
  //
  // Attach event handlers to channels declared in `this.channels using
  // `document` as a context

  listenChannels: function() {
    Essential.Core.mapEvents.call(this, this.channels, document);
  },

  // Emit
  // ----
  //
  // Facilitates the emission of custom events through the CustomEvent
  // Interface. IE9 and IE10 are supported via polyfill
  //
  // since v0.5.0
  //
  // param dataset[`Object`] valid dataset values are:
  //
  //   - channel: [`String`] name (identifier) of the channel
  //
  //   - context: [`DOMElement`] DOM context in which the event is triggered,
  //      this parameter can be ommited. Default value is `document`
  //
  //   - bubles: [`Boolean`] defines if this event should bubble or not,
  //     defaults to true
  //
  //   - cancelable: [`Boolean`] indecates whether the event is cancelable,
  //     defaults to false
  //
  //   - data: [`Object`] data to be included in the `"detail"` key of the
  //      event can be accesed later via `event.detail`
  //      (check the CustomEvent spec for more info)

  emit: function(dataset) {
    dataset.context = dataset.context || this.el;
    dataset.data = dataset.data || {};
    dataset.bubbles = dataset.bubbles || true;
    dataset.cancelable = dataset.cancelable || false;

    var customEvent = new CustomEvent(dataset.channel, {
      "bubbles": dataset.bubbles,
      "cancelable": dataset.cancelable,
      "detail": dataset.data
    });

    dataset.context.dispatchEvent(customEvent);
  },

  priority: 0
});
