bardia.layout.Panel = bardia.oop.Class.create({
    
    initialize: function(config) {
    	bardia.oop.Class.extend(this, config || {});
        this.render();
    },
    
    render: function() {
        var h = this;

        h.root = h.prepareRoot();
        h.inside.update(h.root);

        h.setTabs(h.tabs);
        h.setButtons((h.buttons || []));

        $_upgradeElement(h.root);
    },
    
    getContent: function() {
    	return this.root.find("contents");
    },
    
    setTitle: function(title) {
    	this.root.find("title").update(title);
    },
    
    setTabs: function(tabs) {
        var h = this;

        h.prepareHeaderTabs(tabs || []);
        h.prepareContentTabs(tabs || []);
    },
    
    prepareHeaderTabs: function(tabs) {
        var h = this;

        if ((tabs || []).length <= 0) {
        	return;
        }

        if (h.root.find("header-tabs") !== null) {
            h.root.find("header-tabs").update();
        } else {
            var header = h.root.find("header")
            header.insert($_element({
                $_tag: "div", 
                class: "mdl-layout__tab-bar mdl-js-ripple-effect", 
                id: "header-tabs",
            }));
        }

        tabs.forEach(function(tab, index) {
            var tabHeader = $_element({
                $_tag: "a",
                $_append: tab.name,
                $_on: {
                    "click": function(e) {
                        if (tab.onActivate && !tab.activated) {
                            setTimeout(function() {
                                tab.onActivate(h.root.find("tab_" + index));
                                tab.activated = true;
                            }, 500);
                        }
                    }
                },
                href: "#tab_" + index,
                class: "mdl-layout__tab",
            });
            h.root.find("header-tabs").insert(tabHeader);
        });
    },

    prepareContentTabs: function(tabs) {
        var h = this;

        h.root.find("contents").update();

        tabs.forEach(function(tab, index) {
            var tabContent = $_element({
                $_tag: "section", class: "mdl-layout__tab-panel", id: "tab_" + index,
                style: "position:absolute; height:100%; width:100%;"
            });
            h.root.find("contents").insert(tabContent);
        });
    },

    prepareRoot: function() {
        var h = this;

        var json = {
            $_tag: "div", 
            class: "mdl-layout mdl-js-layout mdl-layout--fixed-header",
            $_append: [{
                $_tag: "header", class: "mdl-layout__header", id: "header",
                $_append: [{
                    $_tag: "div", class: "mdl-layout__header-row",
                    $_append: [{
                        $_tag: "span", class: "mdl-layout-title", id: "title",
                        $_append: h.title
                    }, {
                        $_tag: "div",
                        class: "mdl-layout-spacer",
                    }, {
                        $_tag: "nav",
                        id: "buttons",
                        class: "mdl-navigation mdl-layout--large-screen-only",
                    }]
                }]
            }, {
                $_tag: "main", class: "mdl-layout__content", 
                id: "contents",
                style: "position:relative"
            }]
        };

        return $_element(json);
    },
    
    setButtons: function(buttons) {
    	var h = this;

    	buttons.forEach(function(button) {
	    	h.root.find("buttons").insert($_element({
	            $_tag: "button",
	            class: "mdl-button mdl-js-button mdl-button--icon",
	            $_on: {
	            	"click": function(e) {
	            		alert(e);
	            	}
	            },
	            $_append: [{
	                $_tag: "a",
	                class: "mdl-navigation__link",
	                href: "",
	                $_append: [{
	                    $_tag: "i",
	                    class: "material-icons",
	                    $_append: button.icon
	                }]
	            }]
	        }));
    	});
    }
});