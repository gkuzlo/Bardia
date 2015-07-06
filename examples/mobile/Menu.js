/**
 *
 */
Menu = Class.create({
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
            style: "position:absolute; top:10px; left:10px; right:10px; bottom:10px; background:blue; overflow:hidden"
        });
        h.config.inside.update(h.material);

        h.showMenu();
    },
    /**
     *
     */
    showMenu: function() {
        var h = this;

        var toolbar = new UI.Toolbar({
            inside: h.material,
            items: [
                {
                    name: "PRZYSTANKI",
                    customIcon: "images/stoppoint.png"
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
    }
});