/**
 *
 */
MBL.Menu = Class.create({
	/*
	 *
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
        }, config || {});

        this.render();
    },
    /**
     *
     */
    render: function() {
        var h = this;

        h.material = new Element("DIV", {
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; overflow:hidden"
        });
        h.config.inside.update(h.material);

        h.renderMenu();
    },
    /**
     *
     */
    renderMenu: function() {
        var h = this;

        var toolbar = new UI.Toolbar({
            inside: h.material,
            autoclick: false,
            items: h.config.items
        });
    },
});