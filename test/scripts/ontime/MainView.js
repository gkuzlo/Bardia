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
                            name: "Imię",
                            property: "firstName"
                        }, {
                            name: "Nazwisko",
                            property: "lastName"
                        }]
                    }).fetch({
                        rows: [{
                            firstName: "Jan",
                            lastName: "Kowalski"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }, {
                            firstName: "Jan",
                            lastName: "Nowak"
                        }]
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
                        new bardia.list.MobileList({
                            inside: html
                        });
                    } catch (e) {
                        alert(e);
                    }
                }
            }, {
                name: "Form",
                onActivate: function(html) {
                    try {
                    	
                	var layout = new bardia.layout.BorderLayout({
                		inside: html,
                		west: {
                			width: 500
                		}
                	});


                        new bardia.form.Form({
                            inside: layout.getWest(),
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
                                label: "Data urodzenia",
                                property: "dob",
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
                            }]
                        });

	                    var panel = new bardia.layout.Panel({
	                    	inside: layout.getDefault(),
	                    	buttons: [{
	                    		icon: "android"
	                    	}, {
	                    		icon: "backup"
	                    	}]
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