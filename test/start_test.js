describe("Essential#start", function() {
  context("given an application and a behavior attached to a DOM element", function() {

    beforeEach(function() {
      setDocumentContents("test/fixtures/single_element.html");
      this.domElement = document.getElementById("carousel");
      this.app = {};
    });

    it("initializes a behavior with the proper name", function() {
      this.app.Carousel = customBehavior;
      Essential.start(this.app);
      this.domElement.dispatchEvent(Events.click());

      expect(Helper.flag).to.not.equal(0);
    });

    it("does not initialize a behavior or raise an exception if the behavior name is not defined", function() {
      this.app.AnotherBehavior = customBehavior;
      Essential.start(this.app);
      this.domElement.dispatchEvent(Events.click());

      expect(Helper.flag).to.not.equal(0);
    });
  });
});
