describe("Essential.Core#bind", function () {
  context("given a NodeList", function () {

    beforeEach(function () {
      document.body.innerHTML = __html__["test/fixtures/basic_structure.html"];
      this.nodeList = document.querySelectorAll("[data-behavior]");

      Helper.flag = 0;
    });

    it("must bind a given event on every node", function () {
      Essential.Core.bind("hover", Helper.changeFlag, this.nodeList);

      applyToAll(this.nodeList, "dispatchEvent", Events.hover());

      expect(Helper.flag).to.be.eql(this.nodeList.length);
    });

    it("must bind only the requested event", function () {
      Essential.Core.bind("hover", Helper.changeFlag, this.nodeList);

      applyToAll(this.nodeList, "dispatchEvent", Events.click());

      expect(Helper.flag).to.be.eql(0);
    });
  });

  context("given an Array of nodeElements", function () {

    beforeEach(function () {
      document.body.innerHTML = __html__["test/fixtures/basic_structure.html"];
      elements = document.getElementsByTagName("li");
      this.arrayOfElements = [elements[0], elements[1]];
      Helper.flag = 0;
    });

    it("must bind a given event on every node", function () {
      Essential.Core.bind("hover", Helper.changeFlag, this.arrayOfElements);

      applyToAll(this.arrayOfElements, "dispatchEvent", Events.hover());

      expect(Helper.flag).to.be.eql(this.arrayOfElements.length);
    });

    it("must bind only the requested event", function () {
      Essential.Core.bind("hover", Helper.changeFlag, this.arrayOfElements);

      applyToAll(this.arrayOfElements, "dispatchEvent", Events.click());

      expect(Helper.flag).to.be.eql(0);
    });

  });
});
