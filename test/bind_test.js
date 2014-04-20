describe("Essential.Core#bind", function () {
  describe("given a NodeList", function () {

    beforeEach(function () {
      document.body.innerHTML = __html__["fixtures/basic_structure.html"];
      this.nodeList = document.querySelectorAll("[data-behavior]");

      // This way of create events are deprecated, see
      // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent for more
      // information, we are forced to this beacuse PhantomJS does not support
      // event constructors

      this.clickEvent = document.createEvent("Event")
      this.clickEvent.initEvent('click', false, true);
      this.hoverEvent = document.createEvent("Event")
      this.hoverEvent.initEvent('hover', false, true);
      this.flag = 0;

      // Also I prefer Function.prototype.bind, instead of the _this trick,
      // but we are tired with IE8 & PhantomJS

      _this = this;
      this.changeFlag = function () { _this.flag++; };
    });

    it("must bind a requested event on every node", function () {
      var i = -1;

      Essential.Core.bind("hover", this.changeFlag, this.nodeList);

      while (this.nodeList[++i]) {
        this.nodeList[i].dispatchEvent(this.hoverEvent);
      }

      expect(this.flag).to.be.eql(this.nodeList.length);

    });

    it("must bind only the requested event", function () {
      var i = -1;

      Essential.Core.bind("hover", this.changeFlag, this.nodeList);

      while (this.nodeList[++i]) {
        this.nodeList[i].dispatchEvent(this.clickEvent);
      }

      expect(this.flag).to.be.eql(0);

    });
  });
});
