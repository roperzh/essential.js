EssentialPage = {};

EssentialPage.CodeArea = Essential.Behavior.extend({
  init: function() {
    hljs.highlightBlock(this.el);
  }
});

EssentialPage.TabbedContainer = Essential.Behavior.extend({
  events: {
    "click .tab-header": "switchTab"
  },

  switchTab: function(e) {
    e.preventDefault();

    var selectedHeader = e.currentTarget,
      tabName = selectedHeader.getAttribute("data-content");
      selectedContent = this.el.querySelectorAll("[data-name=" + tabName + "]")[0];

    var activeItems = this.el.getElementsByClassName("active"),
      itemsCount = activeItems.length;
      i = -1;

    while(++i < itemsCount) {
      activeItems[0].classList.remove("active");
    }

    selectedHeader.classList.add("active");
    selectedContent.classList.add("active");
  }
});

Essential.start(EssentialPage);
