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
			},
			onBack: function() {
			    h.goBack();
			}
		});
    },
    goBack: function() {
        var h = this;

        if (h.panels) {
            var material = h.panels.pop();
                material.remove();
        }

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
                    name: "ZGŁASZANIE PROBLEMÓW",
                    customIcon: "images/injury.png",
                    onClick: function() {
                        setTimeout(function() {
                            h.showIssues(html);
                        }, 500);
                    }
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
    },
    /**
     *
     */
    showIssues: function(html) {
        var h = this;

        var panel = new UI.Panel({
            inside: h.createContent(html),
            title: "Czego dotyczy problem?"
        });

        var menu = new MBL.Menu({
            inside: panel.getContent(),
            title: "Wybierz przystanek",
            items: [
                {
                    name: "PRZYSTANKI",
                    customIcon: "images/stoppoint.png",
                    onClick: function(reasonBean) {
                        var p = new UI.Panel({
                            inside: h.createContent(html),
                            title: "Problem dotyczy: " + reasonBean.name
                        });

                        var stops = new MBL.Stops({
                            inside: p.getContent(),
                            title: "Wybierz przystanek",
                            onSelect: function(stopPoint) {

                                var nextPanel = new UI.Panel({
                                    title: "(" + stopPoint.symbol + ") " + stopPoint.name,
                                    inside: h.createContent(p.getContent())
                                });

                                new MBL.Menu({
                                    inside: nextPanel.getContent(),
                                    items: [
                                        {
                                            name: "Brak słupka",
                                            customIcon: "images/settings.png",
                                            onClick: function(obj) {
                                                h.addReason(nextPanel, obj);
                                            }
                                        },
                                        {
                                            name: "Brak rozkładu",
                                            customIcon: "images/settings.png",
                                            onClick: function(obj) {
                                                h.addReason(nextPanel, obj);
                                            }
                                        },
                                        {
                                            name: "Nieaktualny rozkład",
                                            customIcon: "images/settings.png",
                                            onClick: function(obj) {
                                                h.addReason(nextPanel, obj);
                                            }
                                        },
                                        {
                                            name: "Brudno",
                                            customIcon: "images/settings.png",
                                            onClick: function(obj) {
                                                h.addReason(nextPanel, obj);
                                            }
                                        },
                                        {
                                            name: "Wybita szyba",
                                            customIcon: "images/settings.png",
                                            onClick: function(obj) {
                                                h.addReason(nextPanel, obj);
                                            }
                                        }
                                    ]
                                });
                            }
                        });
                    }
                },
                {
                    name: "POJAZDY",
                    customIcon: "images/stoppoint.png",
                    onClick: function(reasonBean) {
                        var p = new UI.Panel({
                            inside: html,
                            title: "Problem dotyczy: " + reasonBean.name
                        });

                        var vehicles = new MBL.Vehicles({
                            inside: p.getContent(),
                            title: "Wybierz pojazd",
                            onSelect: function(vehicle) {

                                var nextPanel = new UI.Panel({
                                    title: "Numer boczny: " + vehicle.number + " ",
                                    inside: h.createContent(p.getContent())
                                });

                                new MBL.Menu({
                                    inside: nextPanel.getContent(),
                                    items: [
                                        {
                                            name: "Brak klimatyzacji",
                                            customIcon: "images/settings.png",
                                            onClick: function(obj) {
                                                h.addReason(nextPanel, obj);
                                            }
                                        },
                                        {
                                            name: "Brudny pojazd",
                                            customIcon: "images/settings.png",
                                            onClick: function(obj) {
                                                h.addReason(nextPanel, obj);
                                            }
                                        }
                                    ]
                                });
                            }
                        });
                    }
                },
                {
                    name: "ROZKŁAD JAZDY",
                    customIcon: "images/stoppoint.png",
                },
            ]
        });
    },
    addReason: function(panel, reason) {
        var h = this;

        var nextPanel = new UI.Panel({
            inside: h.createContent(panel.getContent()),
            title: reason.name
        });

        h.beforeAddPhoto(nextPanel);
    },
    beforeAddPhoto: function(panel) {
        var h = this;

        new MBL.Confirm({
            title: "Czy dodać zdjęcie do zgłoszenia?",
            inside: panel.getContent(),
            onYes: function() {
                h.addPhoto(panel);
            },
            onNo: function() {
                h.beforeSend(panel);
            }
        });
    },
    addPhoto: function(panel) {
        var h = this;

        var nextPanel = new UI.Panel({
            inside: h.createContent(panel.getContent()),
            title: "Dodane zdjęcie"
        });

        h.beforeSend(nextPanel);
    },
    beforeSend: function(panel) {
        var h = this;

        new MBL.Confirm({
            title: "Czy oczekujesz odpowiedzi?",
            inside: panel.getContent(),
            onYes: function() {
                h.finishProcess(panel);
            },
            onNo: function() {
                h.finishProcess(panel);
            }
        });
    },
    finishProcess: function(panel) {
        var h = this;

        var nextPanel = new UI.Panel({
            inside: h.createContent(panel.getContent()),
            title: "Zgłoszenie wysłane"
        });
    },
    /**
     *
     */
    createContent: function(parent) {
        var h = this;

        var element = new Element("DIV", {
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; background;white"
        });

        parent.insert(element);

        if (h.panels == undefined) {
            h.panels = [];
        }

        h.panels.push(element);

        return element;
    }
});