describe("Essential.Core#camelize", function () {

  it("converts to upper case non-dashed strings", function () {
    var non_dashed = "test";
    expect(Essential.Core.camelize(non_dashed)).to.eql("Test");
  });

  it("converts underscore_separated strings to CamelCase", function () {
    var string = "test_method";
    expect(Essential.Core.camelize(string)).to.eql("TestMethod");
  });

  it("converts colon:separated strings to CamelCase", function() {
    var string = "test:method";
    expect(Essential.Core.camelize(string)).to.eql("TestMethod");
  });

  it("converts dash-separated strings to CamelCase", function() {
    var string = "test-method";
    expect(Essential.Core.camelize(string)).to.eql("TestMethod");
  });
});
