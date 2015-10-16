/**
 *
 */
cesip.MainView = bardia.oop.Class.create({

    initialize: function(config) {
        this.config = config;

        this.render();
    },

    render: function() {
        var h = this;

        var layout = new bardia.layout.BorderLayout({
            inside: h.config.inside,
        });

        var mainTabs = new bardia.layout.Tabs({
            inside: layout.getDefault(),
            tabs: [{
                name: "Mapa",
                onActivate: function(html) {
                    try {
                        new cesip.map.MapFeatures({
                            inside: html
                        });
                    } catch (e) {
                        alert(e);
                    }
                }
            }, {
            	name: "Dane rozkładowe",
            	onActivate: function(html) {
            		new cesip.schedules.SchedulesData({
            			inside: html
            		});
            	}
            }, {
            	name: "Dane rzeczywiste",
            	onActivate: function(html) {
            		new cesip.realtime.Realtime({
            			inside: html
            		});
            	}
            }, {
            	name: "Konfiguracja",
            	onActivate: function(html) {
            		new cesip.configuration.Configuration({
            			inside: html
            		});
            	}
            }, {
                name: "Form",
                onActivate: function(html) {
                    try {
	                    new bardia.form.Form({
	                        inside: html,
	                        title: "Dane personalne",
	                        fields: [{
	                            label: "Imię",
	                            property: "firstName",
	                        }, {
	                            label: "Nazwisko",
	                            property: "lastName",
	                            required: true
	                        }, {
	                            label: "Wiek",
	                            property: "age",
	                            type: "Date"
	                        }, {
	                            label: "Kraj",
	                            property: "country",
	                            type: "Date"
	                        }, {
	                            label: "Data urodzenia",
	                            property: "dob",
	                            type: "Date"
	                        }, {
	                            label: "Firma",
	                            property: "company",
	                            type: "Lookup",
	                            renderLabel: function(value) {
	                            	return value;
	                            },
	                            onExpand: function(html) {
	                            	var grid = new bardia.grid.Grid({
	                            		inside: html,
	                            		columns: [{
	                            			name: "A",
	                            			property: "a"
	                            		}]
	                            	});
	                            }
	                        }, {
	                        	label: "plik",
	                        	property: "fileToUpload",
	                        	type: "File"
	                        }],
	                    	buttons: [{
	                    		icon: "android"
	                    	}, {
	                    		icon: "backup"
	                    	}]
	                    }).setBean({
	                    	dob: new Date().getTime()
	                    });                    
                    } catch (e) {
                        alert("4. " + e);
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