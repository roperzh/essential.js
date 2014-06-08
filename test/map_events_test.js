describe("Essential.Core#mapEvents", function() {
  context("given an object with events and a document context", function() {
    beforeEach(function() {
      setDocumentContents("test/fixtures/single_element.html");
      Helper.flag = 0;
      this.setFlag = Helper.changeFlag;
      this.domElement = document.getElementsByTagName("a")[0];
    });

    it("attach standard to elements contained in the context", function() {
      var events = {
        "click a": "setFlag"
      };
      Essential.Core.mapEvents.call(this, events, document);
      this.domElement.dispatchEvent(Events.click());

      expect(Helper.flag).to.be.eql(1);
    });

    it("attach custom events to elements contained in the context", function() {
      var events = {
        "change:flag": "setFlag"
      };
      var customEvent = new CustomEvent("change:flag", {}),
        element = document.getElementById("carousel");

      Essential.Core.mapEvents.call(this, events, element);
      element.dispatchEvent(customEvent);

      expect(Helper.flag).to.be.eql(1);
    });
  });
});
