/**
 *
 */
ontime.MainView = bardia.oop.Class.create({

    initialize: function(config) {
        this.config = config;

        this.render();
    },

    render: function() {
        var h = this;

        var layout = new bardia.layout.BorderLayout({
            inside: h.config.inside,
        });

        var panel = new bardia.layout.Panel({
            inside: layout.getDefault(),
            tabs: [{
                name: "Grid",
                onActivate: function(html) {
                    new bardia.grid.Grid({
                        inside: html,
                        columns: [{
                            name: "Imię"
                        }, {
                            name: "Nazwisko"
                        }]
                    }).fetch({
                        rows: [1,2,3,4]
                    });
                }
            }, {
                name: "Mapa",
                onActivate: function(html) {
                    try {
                        new ontime.map.MapFeatures({
                            inside: html
                        });
                    } catch (e) {
                        alert(e);
                    }
                }
            }, {
                name: "Mobile list",
                onActivate: function(html) {
                    try {
                        new ontime.map.MapFeatures({
                            inside: html
                        });
                    } catch (e) {
                        alert(e);
                    }
                }
            }]
        });
        
        var material = new bardia.layout.Material({
            inside: document.body
        });
        
        material.show();
    }
});