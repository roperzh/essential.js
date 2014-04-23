describe("Essential.Behavior", function () {
  describe("given a DOM element", function () {

    beforeEach(function () {
      document.body.innerHTML = __html__["test/fixtures/single_element.html"];
      this.domElement = document.getElementById("carousel");
    });

    it("stores the DOM element on initialization", function () {
      behavior = Essential.Behavior.new(this.domElement);
      expect(behavior.el).to.be.eq(this.domElement);
    });

    describe("given a hash of events", function () {

      beforeEach(function () {
        this.customBehavior = Essential.Behavior.extend({
          events: {
            "click": "clickHandler",
            "click li": "customClickHandler",
            "hover": "notDefinedEvent"
          },
          clickHandler: function () {
           clickFlag = true;
          },
          customClickHandler: function() {
            clustomClickFlag = true;
          }
        });

        this.clickEvent = document.createEvent("Event")
        this.clickEvent.initEvent('click', false, true);
      });

      it("delegates the events contained in the hash to the domElement", function () {
        behavior = this.customBehavior.new(this.domElement);
        this.domElement.dispatchEvent(this.clickEvent);
        expect(clickFlag).to.be.true;
      });

      it("", function() {
        behavior = this.customBehavior.new(this.domElement);
        nestedElement = this.domElement.getElementsByTagName("li")[0];
        nestedElement.dispatchEvent(this.clickEvent);
        expect(clustomClickFlag).to.be.true;
      });

      it("pass off if a event is not defined", function() {
        behavior = this.customBehavior.new(this.domElement);
        expect(behavior).to.be.ok
      });
    });
  });
});
