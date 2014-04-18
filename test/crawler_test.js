describe("Essential#crawler", function() {
  describe("given six associated behaviors in the DOM", function() {

    beforeEach(function() {
      document.body.innerHTML = __html__["fixtures/basic_structure.html"];
      this.crawledContent = Essential.Core.crawler();
    });

    it("must return an object with six keys", function() {
      expect(this.crawledContent).to.be.an("Object");
      expect(Object.keys(this.crawledContent).length).to.eql(6);
    });

    it("must return an object with the names of the associated behaviors as a keys", function() {
      expect(Object.keys(this.crawledContent)).to.eql(
        ["test", "test-inner", "multiple1", "multiple2", "test2", "test-inner2"]
      );
    });

    it("must allow multiple behaviors attached on the same element", function() {
      expect(Object.keys(this.crawledContent)).to.include("multiple1");
      expect(Object.keys(this.crawledContent)).to.include("multiple2");
    });
  });
});
