describe("Main initializer", function() {
  it("must initialize the Essential main object", function() {
    expect(Essential).to.not.be.equal(undefined);
  });

  describe("Essential", function() {
    it("must initialize the Core namespace", function() {
      expect(Essential.Core).to.not.be.equal(undefined);
    });

    it("must initialize the Behaviors namespace", function() {
      expect(Essential.Behaviors).to.not.be.equal(undefined);
    });
  });
});
