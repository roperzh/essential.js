// Map Events
// ----------
//
// since v0.5.0
//
// Given a document context, maps a hash of events to all ocurrences
// in the context using the DOM Event Interface
//
// param events[`Object`] key-value map which follows some conventions:
//
//   - key: must be a String, containing the event name. Optionally after the event
//     name a valid CSS selector must be placed, for example `"click #element"`
//
//   - value: must be a name of a funciton pertaining to the current in which
//     `mapEvents` its executed
//
// param context[`DOMElement`] element to search through
//
// **Example**
// ```javascript
// var events = {
//   "click .next": "goToNextSlide"
// };
//
// Essential.Core.mapEvents(events, document);
// ```


Essential.Core.mapEvents = function(events, context) {
  if(typeof events === "undefined") {
    return;
  }

  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  for(var key in events) {
    var method = events[key];

    var match = key.match(delegateEventSplitter);
    var eventName = match[1],
      selector = match[2],
      nodeList = selector ? context.querySelectorAll(selector) : [context];

    if(typeof this[method] === "undefined") {
      continue;
    }

    Essential.Core.bind(eventName, nodeList, this[method].bind(this));
  }
};
