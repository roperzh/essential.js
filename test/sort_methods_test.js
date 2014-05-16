describe("Essential.Core.SortMethods", function() {
  describe("#byPriority", function() {

    it("orders an array of behaviors in descendent order based on their priorities", function() {
      FirstPriorityBehavior = Essential.Behavior.extend({
        priority: 3
      });
      SecondPriorityBehavior = Essential.Behavior.extend({
        priority: 2
      });
      ThirdPriorityBehavior = Essential.Behavior.extend({
        priority: 1
      });

      var simpleArray = [SecondPriorityBehavior, FirstPriorityBehavior, ThirdPriorityBehavior];

      var sortedArray = simpleArray.sort(Essential.Core.SortMethods.byPriority);

      expect(sortedArray[0]).to.be.eq(FirstPriorityBehavior);
      expect(sortedArray[1]).to.be.eq(SecondPriorityBehavior);
      expect(sortedArray[2]).to.be.eq(ThirdPriorityBehavior);
    });
  });
});
