//     EssentialJS v0.1.0
//     Copyright (c)2014 Roberto Dip
//     Distributed under MIT license
//     http://roperzh.github.io/essential.js

window.Essential = {

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
    var crawledContent = this.Core.crawl(),
      rawBehaviorsNames = Object.keys(crawledContent),
      i = -1;

    while (rawBehaviorsNames[++i]) {
      var rawName = rawBehaviorsNames[i],
        name = this.Core.camelize(rawName),
        behavior = application[name];

      if (typeof behavior === "undefined") continue;
      behavior.new(crawledContent[rawName]);
    }
  }

};
