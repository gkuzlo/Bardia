ComplexView = Class.create({
	/*
	 * 
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
        }, config || {});

        try {
            this.render();
        } catch (e) {
            alert(e);
        }
    },
    render: function() {
    	var h = this;

		var tabs = new UI.Panel({
			inside: window.document.body,
			title: "UI.Panel",
			tabs: [
				{
					name: "Tab 1",
					onActivate: function(html) {

						var gridLayout = new UI.BorderLayout({
							inside: html,
							west: {
							    width: 500
							}
						});

						new UI.Form({
							inside: gridLayout.getWest(),
							title: "UI.Form",
							fields: [{
								label: "Imię",
								property: "firstName"
							},{
								label: "Nazwisko",
								property: "lastName"
							},{
								label: "Wiek",
								property: "age",
								type: "Integer"
							}, {
								label: "Firma",
								property: "company",
								type: "Lookup",
								render: function(arg) {
									return arg.name;
								},
								onExpand: function(html) {
								}
							}]
						}).setBean({
							firstName: "Grzegorz",
							lastName: "Kuzło"
						});

						new UI.Form({
							inside: gridLayout.getDefault(),
							title: "UI.Form",
							fields: [{
								label: "Imię",
								property: "firstName"
							},{
								label: "Nazwisko",
								property: "lastName"
							},{
								label: "Wiek",
								property: "age",
								type: "Integer"
							}]
						}).setBean({
							firstName: "Grzegorz",
							lastName: "Kuzło"
						});
					}
				},
				{
					name: "Tab 2",
					onActivate: function(html) {
						var gridLayout = new UI.BorderLayout({
							inside: html,
							north: {
							    height: 200
							}
						});

						new UI.Form({
							inside: gridLayout.getDefault(),
							title: "UI.Form",
							fields: [{
								label: "Imię",
								property: "firstName"
							},{
								label: "Nazwisko",
								property: "lastName"
							},{
								label: "Wiek",
								property: "age",
								type: "Integer"
							}]
						}).setBean({
							firstName: "Grzegorz",
							lastName: "Kuzło"
						});
					}
				},
				{
					name: "Tab 3"
				}
			]
		});



        /*
		var form = new UI.Form({
		    inside: layout.getWest(),
		    title: "UI.Form",
		    fields: [
		        {
		            label: "Imię",
		            property: "firstName"
		        },
		        {
		            label: "Hasło",
		            property: "password",
		            type: "Password"
		        },
		        {
		        	label: "Wiek",
		        	property: "age",
		        	type: "Integer"
		        },
		        {
		        	label: "Mężczyzna",
		        	property: "female",
		        	type: "Boolean"
		        },
		        {
		            label: "Firma",
		            property: "company",
		            type: "Lookup",
		            render: function(bean) {
		                return bean.name;
		            },
		            onExpand: function(controler, html) {
		                var grid = new UI.Grid({
		                    inside: html,
		                    title: "Firmy",
		                    columns: [
		                        {
		                            name: "name",
		                            property: "name"
		                        }
		                    ],
		                    onClick: function(row) {
		                        controler.setProperty(row.bean);
		                    }
		                });

		                grid.fetch({
		                    rows: [
		                        {
		                            name: "IBM"
		                        },
		                        {
		                            name: "Google"
		                        },
		                        {
		                            name: "Microsoft"
		                        },
		                    ]
		                });
		            }
		        },
		    ],
		    onChange: function(propertyName, propertyValue) {
		        layout.getEast().update(JSON.stringify(form.getBean(), null, 4));
		    }
		});
		form.setBean({
			firstName: "Grzegorz",
			age: 123
		});

		*/
    }
});