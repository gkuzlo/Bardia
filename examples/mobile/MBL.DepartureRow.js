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
            class: "line-symbol"
        });
        h.div.insert(h.line);
        h.line.update(h.config.bean.line.name);

        h.direction = new Element("DIV", {
            class: "line-name"
        });
        h.direction.update(h.config.bean.line.direction);
        h.div.insert(h.direction);

        h.symbols = new Element("DIV", {
            class: "line-symbols"
        });
        h.symbols.insert(new Element("IMG", {
            src: "images/snowflake.png",
            style: "width:12px"
        }));
        h.div.insert(h.symbols);

        h.time = new Element("DIV", {
        });

        if (h.config.bean.real === true) {
            h.time.addClassName("departure-real-time");
            //h.time.update(h.config.bean.departure);
            h.time.update("7<u style='font-size:16px; vertical-align:top; opacity:0.5'>min</u>");
        } else {
            h.time.addClassName("departure-schedule-time");
            //h.time.update(h.config.bean.departure);
            h.time.update("13<u style='font-size:20px; vertical-align:top; opacity:0.5'>23</u>");
        }

        h.div.insert(h.time);
    },
    /**
     *
     */
    getMaterial: function() {
        var h = this;

        return h.div;
    }
});