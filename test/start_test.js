describe("Essential#start", function () {
  context("given an application and a behavior attached to a DOM element", function () {

    beforeEach(function () {
      setDocumentContents("single_element");
      this.domElement = document.getElementById("carousel");
      this.app = {};
    });

    it("initializes a behavior with the proper name", function () {
      this.app.Carousel = customBehavior;
      Essential.start(this.app);
      this.domElement.dispatchEvent(Events.click());

      expect(Helper.flag).to.not.equal(0);
    });

    context("when a behavior is not defined", function () {

      beforeEach(function () {
        this.app = {};
      });

      it("does not initialize a behavior", function () {
        Essential.start(this.app);
        this.domElement.dispatchEvent(Events.click());

        expect(Helper.flag).to.not.equal(0);
      });

      it("does not raise an exception", function () {
        var self = this;

        expect(function () {
          Essential.start(self.app);
        }).to.not.
        throw();
      });
    });
  });
});
