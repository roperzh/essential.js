describe("Essential.Core#crawler", function() {
  context("given six associated behaviors in the DOM", function() {

    beforeEach(function() {
      setDocumentContents("test/fixtures/basic_structure.html");
      this.crawledContent = Essential.Core.crawler();
    });

    it("must return an object with six keys", function() {
      expect(this.crawledContent).to.be.an("Object");
      expect(Object.keys(this.crawledContent).length).to.eql(6);
    });

    it("every key of the object must have the name of the associated behavior", function() {
      expect(Object.keys(this.crawledContent)).to.eql(
        ["test", "test-inner", "multiple1", "multiple2", "test2", "test-inner2"]
      );
    });

    it("must allow multiple behaviors attached on the same element", function() {
      expect(Object.keys(this.crawledContent)).to.include("multiple1");
      expect(Object.keys(this.crawledContent)).to.include("multiple2");
    });

  });

  context("given no associated behaviors in the DOM", function() {

    it("must return an empty object", function() {
      setDocumentContents("test/fixtures/page_without_behaviors.html");
      var crawledContent = Essential.Core.crawler();

      expect(crawledContent).to.be.an("Object");
      expect(Object.keys(crawledContent).length).to.be.eql(0);
    });
  });
});
