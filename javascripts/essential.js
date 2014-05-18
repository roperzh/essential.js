//     EssentialJS v0.1.0
//     Copyright (c)2014 Roberto Dip
//     Distributed under MIT license
//     http://roperzh.github.io/essential.js

window.Essential = {

  rootElement: document,

  Core: {},

  // Start
  // -----
  //
  // Wakes up the engine, searching and attaching
  // behaviors with their proper elements
  //
  // Param application[`Object`] an object containing
  // behaviors names as a key and behaviors objects
  // as a value
  //
  // **Example**
  //
  // ```javascript
  // MyApp = {};
  // MyApp.Carousel = Essential.Behaviors.extend();
  // Essential.start(MyApp);
  // // will attach the carousel behavior to proper elements
  // ```

  start: function (application) {
    var crawledContent = this.Core.crawl(this.rootElement),
      rawBehaviorsNames = Object.keys(crawledContent),
      i = -1;

    while (rawBehaviorsNames[++i]) {
      var rawName = rawBehaviorsNames[i],
        name = this.Core.camelize(rawName),
        behavior = application[name];

      if (typeof behavior !== "undefined") {
        var behaviorsList = crawledContent[rawName],
          j = -1;

        while(behaviorsList[++j]) {
          behavior.new(behaviorsList[j]);
        }
      }

    }
  }
};
/*!
 * Includes proto-js by Axel Rauschmayer
 * https://github.com/rauschma/proto-js
 */

if (!Object.getOwnPropertyDescriptors) {
  Object.getOwnPropertyDescriptors = function (obj) {
    var descs = {};
    Object.getOwnPropertyNames(obj).forEach(function (propName) {
      descs[propName] = Object.getOwnPropertyDescriptor(obj, propName);
    });
    return descs;
  };
}

var Proto = {
  new: function () {
    var instance = Object.create(this);
    if (instance.constructor) {
      instance.constructor.apply(instance, arguments);
    }
    return instance;
  },

  extend: function (subProps) {
    var subProto = Object.create(this, Object.getOwnPropertyDescriptors(subProps));
    subProto.super = this;
    return subProto;
  },
};

Function.prototype.extend = function (subProps) {
  var constrFunc = this;
  var tmpClass = Proto.extend.call(constrFunc.prototype, Proto);
  return tmpClass.extend(subProps);
};
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
    if (typeof this.init === "function") {
      this.init();
    }
  },

  delegateEvents: function () {
    if (typeof this.events === "undefined") {
      return;
    }

    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    for (var key in this.events) {
      var method = this.events[key];

      var match = key.match(delegateEventSplitter);
      var eventName = match[1],
        selector = match[2],
        nodeList = selector ? this.el.querySelectorAll(selector) : [this.el];

      if (typeof this[method] === "undefined") {
        continue;
      }

      Essential.Core.bind(eventName, nodeList, this[method].bind(this));
    }
  }
});
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

Essential.Core.bind = function (eventName, nodeList, callback) {
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
// RegExp Helpers
// --------------

// Looks for some of this characters `:` `-` `_` the objetive is allow
// to define behaviors like `cool:carousel` or `small-carousel`

Essential.Core.SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;

// Finds the first letter of a given string

Essential.Core.FIRST_LETTER_REGEXP = /^[a-z]/g;

// Camelize
// --------
//
// Converts strings to UpperCamelCase
//
// Param name[`String`] the name to be camelized
//
// Returns `String` camel case representation of the name
//
// **Example**
//
// ```javascript
// Essential.Core.camelize("cool-carousel");
//
// // => CoolCarousel
// ```

Essential.Core.camelize = function (name) {
  return name.
  replace(Essential.Core.FIRST_LETTER_REGEXP, function (letter) {
    return letter.toUpperCase();
  }).
  replace(Essential.Core.SPECIAL_CHARS_REGEXP, function (_, separator, letter) {
    return letter.toUpperCase();
  });
};
// Crawl
//------
//
// Scans the DOM looking for behaviors
//
// Return `Array<Object>` an array of objects with the behavior name as
// a key and an array of DOM nodes as a value
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
// // => [{ carousel: [<HTMLDivElement>, <HTMLDivElement>] }]
// ```

Essential.Core.crawl = function(rootElement) {
  var all = rootElement.querySelectorAll("[data-behavior], [behavior]"),
    i = -1,
    result = {};

  while (all[++i]) {
    var currentElement = all[i],
      rawBehaviors = currentElement.getAttribute("data-behavior") || currentElement.getAttribute("behavior"),
      behaviorsList = rawBehaviors.split(" "),
      j = -1;

    while (behaviorsList[++j]) {
      var currentBehavior = behaviorsList[j];

      if (result[currentBehavior]) {
        result[currentBehavior].push(currentElement);
      } else {
        result[currentBehavior] = [currentElement];
      }
    }
  }

  return result;
};
