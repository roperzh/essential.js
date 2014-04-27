describe("Main initializer", function() {
  it("must initialize the Essential main object", function() {
    expect(Essential).to.not.be.equal(undefined);
  });

  describe("Essential", function() {
    it("must initialize the Core namespace", function() {
      expect(Essential.Core).to.not.be.equal(undefined);
    });

    it("must define Essential#start", function() {
      expect(Essential.start).to.not.be.equal(undefined);
    });
  });
});
