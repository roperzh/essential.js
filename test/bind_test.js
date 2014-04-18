describe("Essential.Core#bind", function () {
  describe("given a NodeList", function () {

    beforeEach(function () {
      document.body.innerHTML = __html__["fixtures/basic_structure.html"];
      this.nodeList = document.querySelectorAll("[data-behavior]");
      this.clickEvent = new Event("click");
      this.hoverEvent = new Event("hover");
      this.flag = 0;
      this.changeFlag = function () { this.flag++; };
    });

    it("must bind a requested event on every node", function () {
      var i = -1;

      Essential.Core.bind("hover", this.changeFlag.bind(this), this.nodeList);

      while (this.nodeList[++i]) {
        this.nodeList[i].dispatchEvent(this.hoverEvent);
      }

      expect(this.flag).to.be.eql(this.nodeList.length);

    });

    it("must bind only the requested event", function () {
      var i = -1;

      Essential.Core.bind("hover", this.changeFlag.bind(this), this.nodeList);

      while (this.nodeList[++i]) {
        this.nodeList[i].dispatchEvent(this.clickEvent);
      }

      expect(this.flag).to.be.eql(0);

    });
  });
});
