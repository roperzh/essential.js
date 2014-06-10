//     EssentialJS v0.5.0
//     Copyright (c)2014 Roberto Dip
//     Distributed under MIT license
//     http://roperzh.github.io/essential.js

window.Essential = {

  rootElement: document,

  Core: {},

  // Start
  // -----
  //
  // since v0.1.0
  //
  // A wrapper of  `#Essential.loadBehaviors`, this method is deprecated
  // direct usage of `loadBehaviors` is encouraged.
  //
  // Param application[`Object`] an object containing behaviors names as a key
  // and behaviors objects as a value.

  start: function(application) {
    this.loadBehaviors({
      application: application
    });
  },

  // Load Behaviors
  // --------------
  //
  // since v0.5.0
  //
  // Wakes up the engine, searching and attaching
  // behaviors with their proper elements
  //
  // Param options[`Object`] allows the follwing values:
  //  - `application`[`Object`] an object containing behaviors names as a key
  //    and behaviors objects as a value
  //  - `context` [`DOMElement`] context to look for behaviors.
  //     If no context is provided the default is `Essential.rootElement`
  //
  // **Example**
  //
  // ```javascript
  // MyApp = {};
  // MyApp.Carousel = Essential.Behaviors.extend();
  // Essential.loadBehaviors({ application: MyApp, context: document });
  // // will attach the carousel behavior to proper elements
  // ```

  loadBehaviors: function(options) {
    options.context = options.context || this.rootElement;

    var initializedBehaviors =
      this.initializeBehaviors(options.application, options.context);

    this.launchBehaviors(initializedBehaviors);
  },

  // Initialize Behaviors
  // --------------------
  //
  // Crawls an element looking for behaviors and call `#new` on every behavior
  // found with `lateStart = true`, so the behaviors are initialized, but
  // there is no event delegation
  //
  // param application [`Object`] object containing behaviors to be initialized
  //
  // param element [`DomeElement`] context to look for declared behaviors

  initializeBehaviors: function(application, element) {
    var behaviorsInDOM = this.Core.crawl(element),
      rawBehaviorsNames = Object.keys(behaviorsInDOM),
      initializedBehaviors = [],
      i = -1;

    while(rawBehaviorsNames[++i]) {
      var rawName = rawBehaviorsNames[i],
        name = this.Core.camelize(rawName),
        behavior = application[name];

      if(typeof behavior !== "undefined") {
        var elementsWithBehavior = behaviorsInDOM[rawName],
          j = -1;

        while(elementsWithBehavior[++j]) {
          var initializedBehavior = behavior.new(elementsWithBehavior[j], true);
          initializedBehaviors.push(initializedBehavior);
        }
      }
    }

    return initializedBehaviors;
  },

  // Launch Behaviors
  // ----------------
  //
  // Given a list of behaviors, this method sort these based on their
  // `priority` value, and then call `#start` on every one
  //
  // param behaviorList[`Array<Object>`] an array containing behaviors already
  // initialized

  launchBehaviors: function(behaviorList) {
    var sortedBehaviors = behaviorList.sort(this.Core.SortMethods.byPriority),
      i = -1;

    while(sortedBehaviors[++i]) {
      sortedBehaviors[i].start();
    }
  }
};
