/**
 *
 */
MBL.Departures = Class.create({
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

        h.showTabs();
    },
    /**
     *
     */
    showTabs: function() {
        var h = this;

        h.tabs = new UI.Tabs({
            inside: h.config.inside,
            tabs: [
                {
                    name: "ODJAZDY",
                    onActivate: function(html) {
                        h.showDepartures(html);
                    }
                },
                {
                    name: "ROZKŁAD"
                }
            ]
        });
    },
    /**
     *
     */
    showDepartures: function(html) {
        var h = this;

        h.departuresList = new UI.List({
            inside: html,
            render: function(row) {
                return new MBL.DepartureRow({
                    inside: row,
                    bean: row.bean
                }).getMaterial();
            }
        });

        h.departuresList.fetch({
            rows: [
                {
                    line: {
                        name: "13"
                    }
                },
                {
                    line: {
                        name: "14"
                    }
                }
            ]
        });
    }
});