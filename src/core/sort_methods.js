// Sort Methods
// ------------
//
// Namespace to hold sort methods

Essential.Core.SortMethods = {

  // By Priority
  // -----------
  //
  // This criteria allows to sort behaviors based on their respective priorities,
  // in descending order, that means behaviors with bigger priority will appear
  // first

  byPriority: function(behaviorA, behaviorB) {
    return behaviorB.priority - behaviorA.priority;
  }
};
