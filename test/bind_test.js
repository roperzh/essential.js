describe("Essential.Core#bind", function () {
  context("given a NodeList", function () {

    beforeEach(function () {
      setDocumentContents("basic_structure");
      this.nodeList = document.querySelectorAll("[data-behavior]");

      Helper.flag = 0;
    });

    it("must bind a given event on every node", function () {
      Essential.Core.bind("hover", this.nodeList, Helper.changeFlag);

      applyToAll(this.nodeList, "dispatchEvent", Events.hover());

      expect(Helper.flag).to.be.eql(this.nodeList.length);
    });

    it("must bind only the requested event", function () {
      Essential.Core.bind("hover", this.nodeList, Helper.changeFlag);

      applyToAll(this.nodeList, "dispatchEvent", Events.click());

      expect(Helper.flag).to.be.eql(0);
    });

  });

  context("given an Array of nodeElements", function () {

    beforeEach(function () {
      setDocumentContents("basic_structure");
      elements = document.getElementsByTagName("li");
      this.arrayOfElements = [elements[0], elements[1]];
      Helper.flag = 0;
    });

    it("must bind a given event on every node", function () {
      Essential.Core.bind("hover", this.arrayOfElements, Helper.changeFlag);

      applyToAll(this.arrayOfElements, "dispatchEvent", Events.hover());

      expect(Helper.flag).to.be.eql(this.arrayOfElements.length);
    });

    it("must bind only the requested event", function () {
      Essential.Core.bind("hover", this.arrayOfElements, Helper.changeFlag);

      applyToAll(this.arrayOfElements, "dispatchEvent", Events.click());

      expect(Helper.flag).to.be.eql(0);
    });

  });

  context("given a browser without addEventListener function", function () {

    it("must try to attach the events with attachEvent instead", function () {
      setDocumentContents("basic_structure");
      var nodeList = document.querySelectorAll("[data-behavior]"),
        testElement = nodeList[0];

      // Trick to make available attachEvent on PhanthomJS
      testElement.attachEvent = testElement.addEventListener
      testElement.addEventListener = null;

      expect(
        function () {
          Essential.Core.bind("hover", nodeList, Helper.changeFlag);
        }
      ).to.not.throw();
    });

  });
});
