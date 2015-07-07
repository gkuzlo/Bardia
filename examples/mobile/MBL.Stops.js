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

        h.list = new UI.List({
            inside: h.config.inside,
            title: "PRZYSTANKI",
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