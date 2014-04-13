describe("Essential#crawler", function() {
  describe("given four elements with associated behavior in the DOM", function() {

    beforeEach(function() {
      document.body.innerHTML = __html__["fixtures/basic_structure.html"];
      this.crawledContent = Essential.Core.crawler();
    });

    it("must return an object with four keys", function() {
      expect(this.crawledContent).to.be.an("Object");
      expect(Object.keys(this.crawledContent).length).to.eql(4);
    });

    it("must return an object with the name of the associated behavior as a keys", function() {
      expect(Object.keys(this.crawledContent)).to.eql(
        ['test', 'test-inner', 'test2', 'test-inner2']
      );
    });
  });
});
