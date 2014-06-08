describe("Essential.Behavior#emit", function() {
  context("given behaviors listening to an especified event", function() {
    beforeEach(function() {
      setDocumentContents("test/fixtures/single_element.html");
      App = {};
      App.Carousel = Essential.Behavior.extend({
        channels: {
          "change:flag": "changeFlag",
          "set:flag #menu": "setFlag"
        },

        changeFlag: Helper.changeFlag,

        setFlag: function(e) {
          Helper.flag = e.detail.flag || 1;
        }
      });

      Helper.flag = 0;
      Essential.start(App);
    });


    it("emits a custom event with the specified data, in the specified context", function() {
      var el = document.getElementById("menu");
      var b = customBehavior.new(el);
      b.emit({
        channel: "change:flag"
      });

      expect(Helper.flag).to.be.eql(1);
    });

    it("allows to listen a particular DOM element for events", function() {
      var el = document.getElementById("menu");
      var b = customBehavior.new(el);
      b.emit({
        channel: "set:flag"
      });

      expect(Helper.flag).to.be.eql(1);
    });

    it("allows to pass custom data when the event is fired", function() {
      var el = document.getElementById("menu");
      var b = customBehavior.new(el);
      b.emit({
        channel: "set:flag",
        data: {
          flag: 48
        }
      });

      expect(Helper.flag).to.be.eql(48);
    });
  });
});
