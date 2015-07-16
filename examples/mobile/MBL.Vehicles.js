/**
 *
 */
MBL.Vehicles = Class.create({
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
            title: h.config.title || "POJAZDY",
            render: function(row) {
                return new MBL.VehicleRow({
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
                    number: "123",
                    description: "Autobus niskopodłogowy"
                },
                {
                    number: "437",
                    description: "Autobus niskopodłogowy"
                }
            ]
        });
    }
});