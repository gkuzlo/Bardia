/**
 *
 */
MBL.Stops = Class.create({
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

        h.list = new UI.List({
            inside: h.material,
            title: h.config.title || "PRZYSTANKI",
            render: function(row) {
                return new MBL.StopPointRow({
                    inside: row,
                    bean: row.bean
                }).getMaterial();
            },
            onClick: function(row) {
                h.config.onSelect(row.bean);
            }
        });

        h.list.fetch({
            rows: [
                {
                    symbol: "436",
                    name: "Składowa"
                },
                {
                    symbol: "437",
                    name: "Pogodna"
                }
            ]
        });
    }
});