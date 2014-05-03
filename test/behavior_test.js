describe("Essential.Behavior", function () {
  context("given a DOM element", function () {

    beforeEach(function () {
      setDocumentContents("test/fixtures/single_element.html");
      this.domElement = document.getElementById("carousel");
      this.behavior = customBehavior.new(this.domElement);
      Helper.flag = 0;
    });

    it("stores the element in the `el` variable on initialization", function () {
      expect(this.behavior.el).to.be.eq(this.domElement);
    });

    it("executes `init` function on initialization", function () {
      BehaviorWithInit = Essential.Behavior.extend({
        init: Helper.changeFlag
      });

      var behavior = BehaviorWithInit.new(this.domElement);
      expect(Helper.flag).to.be.equal(1);
    });

    it("initializes without any problems if the `init` function is not present",function() {
      expect(function() {
        Essential.Behavior.new(this.domElement);
      }).to.not.throw();
    });

    context("given a hash of events", function () {

      it("delegates the events contained in the hash to `this.el` if no selector is present", function () {
        this.domElement.dispatchEvent(Events.click());
        expect(Helper.flag).to.not.equal(0);
      });

      it("delegates the events contained in the hash to an element inside `this.el` if a selector is present", function () {
        var nestedElement = this.domElement.getElementsByTagName("li")[0];
        nestedElement.dispatchEvent(Events.click());
        expect(Helper.flag).to.not.equal(0);
      });

      it("only delegates events to elements contained by `this.el`", function () {
        var menu = document.getElementById("menu");
        var outsideElement = menu.getElementsByTagName("li")[0];
        outsideElement.dispatchEvent(Events.click());
        expect(Helper.flag).to.be.equal(0);
      });

      it("pass off if an event in the hash is not defined", function () {
        expect(this.behavior).to.be.ok;
      });
    });

    context("without a hash of events", function() {
      it("just ignores the existence of events", function() {
        var behavior = Essential.Behavior.new(this.domElement);
        expect(behavior).to.be.ok;
      });
    });
  });
});
