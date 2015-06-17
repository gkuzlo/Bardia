ComplexView = Class.create({
	/*
	 * 
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
        }, config || {});

        this.render();
    },
    render: function() {
    	var h = this;
    	
		var layout = new UI.BorderLayout({
			inside: h.config.inside,
			north: {
				height: 300
			},
			west: {
				width: 500
			},
			east: {
				width: 500
			}
		});
	
		var form = new UI.Form({
			inside: layout.getWest(),
			title: "UI.Form",
			fields: [
				{
					label: "Name",
					property: "name"
				},
				{
					label: "Description",
					property: "description",
					type: "LongText",
					width: 300
				},
				{
					label: "City",
					property: "city"
				},
				{
					label: "Ok",
					property: "ok",
					type: "Boolean"
				},
				{
					label: "start",
					property: "start",
					type: "Date"
				}
			],
			buttons: [
				{
					name: "Button 1",
					title: "Button 1"
				},
				{
					name: "Button 2",
					title: "Button 2"
				}
			]
		});
		
		form.setBean({
			description: "We have to create description of the form bean",
			city: "Warsaw"
		});
		
		var grid = new UI.Grid({
			inside: layout.getDefault(),
			title: "UI.Grid",
			columns: [
				{
					name: "Column 1",
					property: "val1"
				}, 
				{
					name: "Column 2",
					property: "val2"
				}
			],
			buttons: [
				{
					name: "Button 1",
					title: "Button 1",
					fill: "orange"
				},
				{
					name: "Button 2",
					title: "Button 2"
				}
			]
		});
		
		grid.fetch({
			rows: [
				{
					val1: "value 1",
					val2: "value 2"
				},
				{
					val1: "value 3",
					val2: "value 4"
				}
			]
		});
		
		var panel = new UI.Panel({
			inside: layout.getEast(),
			title: "UI.Panel",
			buttons: [
				{
					name: "Button 1",
					title: "Button 1"
				},
				{
					name: "Button 2",
					title: "Button 2"
				}
			]
		});
		
		var topLayout = new UI.BorderLayout({
			inside: layout.getNorth(),
			north: {
				height: 70
			},
			west: {
				width: 60
			}
		});
		
		var verticalToolbar = new UI.Toolbar({
			inside: topLayout.getWest(),
			items: [
				{
					name: "Administration",
					customIcon: "images/administration.png"
				},
				{
					name: "Konfiguration",
					customIcon: "images/configuration.png"
				},
				{
					name: "Customization",
					customIcon: "images/customization.png"
				}
			]
		});
		
		var horizontalToolbr = new UI.Toolbar({
			inside: topLayout.getNorth(),
			orientation: "horizontal",
			items: [
				{
					name: "Administration"
				},
				{
					name: "Konfiguration"
				},
				{
					name: "Customization"
				}
			]
		});
    }
});