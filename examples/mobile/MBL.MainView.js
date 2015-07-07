/**
 *
 */
MBL.MainView = Class.create({
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

		window.$mobile = new MBL.Mobile({
			inside: h.config.inside,
			onInit: function(html) {
			    h.showMenu(html);
			}
		});
    },
    /**
     *
     */
    showMenu: function(html) {
        var h = this;

        new MBL.Menu({
            inside: html,
            items: [
                {
                    name: "PRZYSTANKI",
                    customIcon: "images/stoppoint.png",
                    onClick: function() {
                        setTimeout(function() {
                            h.showStops(html);
                        }, 500);
                    }
                },
                {
                    name: "LINIE",
                    customIcon: "images/bus.png"
                },
                {
                    name: "MAPA",
                    customIcon: "images/map.png"
                },
                {
                    name: "PLANER PODRÓŻY",
                    customIcon: "images/route.png"
                },
                {
                    name: "ZGŁASZANIE AWARII",
                    customIcon: "images/injury.png"
                },
                {
                    name: "KOMUNIKATY",
                    customIcon: "images/message.png"
                },
                {
                    name: "KONFIGURACJA",
                    customIcon: "images/settings.png"
                }
            ]
        });
    },
    /**
     *
     */
    showStops: function(html) {
        new MBL.Stops({
            inside: html,
            onSelect: function(stopPoint) {
                new MBL.Departures({
                    inside: html
                });
            }
        });
    }
});