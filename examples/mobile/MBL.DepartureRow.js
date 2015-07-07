/*
 *
 */
MBL.DepartureRow = Class.create({
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

        h.line = new Element("DIV", {
            class: "stop-point-symbol"
        });
        h.div.insert(h.line);
        h.line.update(h.config.bean.line.name);

        h.name = new Element("DIV", {
            class: "stop-point-name"
        });
        h.name.update(h.config.bean.name);

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