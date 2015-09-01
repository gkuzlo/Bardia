UI.Panel = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body
        }, config || {});

        this.render();
    },
    render: function() {
        var h = this;

        h.root = h.prepareRoot();
        h.config.inside.update(h.root);

        h.setTabs(h.config.tabs);

        UI.upgrade(h.root);
    },
    getContent: function() {
    	return this.root.querySelector("#contents");
    },
    setTitle: function(title) {
    	this.root.querySelector("#title").update(title);
    },
    setTabs: function(tabs) {
        var h = this;

        if (!tabs) return;

        h.prepareHeaderTabs(tabs);
        h.prepareContentTabs(tabs);
    },
    prepareHeaderTabs: function(tabs) {
        var h = this;

        if (h.root.querySelector("#header-tabs")) {
            h.root.querySelector("#header-tabs").update();
        } else {
            h.root.querySelector("#header").insert(UI.toHTML({
                tag: "div", class: "mdl-layout__tab-bar mdl-js-ripple-effect", id: "header-tabs",
            }));
        }

        tabs.forEach(function(tab, index) {
            var tabHeader = UI.toHTML({
                tag: "a",
                href: "#tab_" + index,
                class: "mdl-layout__tab",
                $insert: tab.name
            });
            h.root.querySelector("#header-tabs").insert(tabHeader);

            tabHeader.on("click", function(e) {
                if (tab.onActivate) {
                    tab.onActivate(h.root.querySelector("#tab_" + index))
                }
            });
        });
    },
    prepareContentTabs: function(tabs) {
        var h = this;

        h.root.querySelector("#contents").update();

        tabs.forEach(function(tab, index) {
            var json = {
                tag: "section", class: "mdl-layout__tab-panel", id: "tab_" + index,
                $insert: [{
                    tag: "div", class: "page-content",
                }]
            }

            var tabContent = UI.toHTML(json);
            h.root.querySelector("#contents").insert(tabContent);
        });
    },
    prepareRoot: function() {
        var h = this;

        var json = {
            tag: "div", class: "mdl-layout mdl-js-layout mdl-layout--fixed-header",
            $insert: [{
                tag: "header", class: "mdl-layout__header", id: "header",
                $insert: [{
                    tag: "div", class: "mdl-layout__header-row",
                    $insert: [{
                        tag: "span", class: "mdl-layout-title", id: "title",
                        $insert: h.config.title
                    }]
                }]
            }, {
                tag: "div", class: "mdl-layout__drawer", style: "max-width:600px",
                $insert: [{
                    tag: "span", class: "mdl-layout-title",
                    $insert: h.config.title,
                }]
            }, {
                tag: "main", class: "mdl-layout__content", id: "contents",
            }]
        };

        return UI.toHTML(json);
    }
});
