// Watch
//------
//
// Watcher who scans the DOM looking for new behaviors
//
// Return `true` if watcher have been initializated else `false`
//

Essential.Core.watch = function(rootElement) {
  var timer = this.interval || 0,
      crawl = this.crawl;
  if( this.timer || 0 >= timer ) {
    return false;
  }

  this.timer = setInterval(function() {
    crawl(rootElement);
  }, timer);
  return true;
};

Essential.Core.removeWatcher = function() {
  return clearInterval(this.timer);
};
