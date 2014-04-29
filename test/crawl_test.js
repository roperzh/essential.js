describe("Essential.Core#crawl", function() {
  context("given six associated behaviors in the rootElement", function() {

    beforeEach(function() {
      setDocumentContents("test/fixtures/basic_structure.html");
      this.crawledContent = Essential.Core.crawl(document);
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

    it("only search for behaviors contained in the rootElement", function() {
      var rootElement = document.getElementsByTagName("section")[0],
        crawledContent = Essential.Core.crawl(rootElement);

      expect(Object.keys(crawledContent)).to.eql(
        ["test-inner", "multiple1", "multiple2"]
      );
    });
  });

  context("given no associated behaviors in the rootElement", function() {

    it("must return an empty object", function() {
      setDocumentContents("test/fixtures/page_without_behaviors.html");
      var crawledContent = Essential.Core.crawl(document);

      expect(crawledContent).to.be.an("Object");
      expect(Object.keys(crawledContent).length).to.be.eql(0);
    });
  });
});
