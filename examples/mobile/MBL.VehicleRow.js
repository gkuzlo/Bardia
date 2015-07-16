/*
 *
 */
MBL.VehicleRow = Class.create({
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

        h.div = new Element("DIV", {
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; overflow:hidden;"
        });
        h.config.inside.update(h.div);

        h.symbol = new Element("DIV", {
            class: "vehicle-number"
        });
        h.div.insert(h.symbol);
        h.symbol.update(h.config.bean.number);

        h.name = new Element("DIV", {
            class: "vehicle-description"
        });
        h.name.update(h.config.bean.description);

        h.div.insert(h.name);
    },
    /**
     *
     */
    getMaterial: function() {
        var h = this;

        return h.div;
    }
});