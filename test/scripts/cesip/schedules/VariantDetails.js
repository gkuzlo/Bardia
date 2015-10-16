
cesip.schedules.VariantDetails = bardia.oop.Class.create({

	initialize : function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
		}, config));
		
		this.render();
	},

	render: function() {
		var h = this;
		
		h.inside.update();

		var rest = new cesip.rest.REST({
			onSuccess: function(fullVariant) {
				h.display(fullVariant);
			},
			onFailure: function(err) {
				alert(err);
			}
		});

		rest.getVariantDetails(h.variant);
	},

	display: function(fullVariant) {
		var h = this;
		
		h.layout = new bardia.layout.BorderLayout({
			inside: h.inside,
			west: {
				width: 400
			}
		});
		
		h.subLayout = new bardia.layout.BorderLayout({
			inside: h.layout.getWest(),
			north: {
				height: 250
			}
		});

		h.displayForm(fullVariant);
		h.displayGrid(fullVariant);
	},

	displayForm: function(fullVariant) {
		var h = this;
		
		h.form = new bardia.form.Form({
			inside: h.subLayout.getNorth(),
			title: "Wariant",
			fields: [
			    {
			    	label: "loid",
			    	property: "loid"
			    },
			    {
			    	label: "correct",
			    	property: "correct",
			    	type: "Boolean"
			    }
			]
		});
		h.form.setBean(fullVariant);
	},

	displayGrid: function(fullVariant) {
		var h = this;

		h.grid = new bardia.grid.Grid({
			inside: h.subLayout.getDefault(),
			clickAfterFetch: true,
			columns: [
			    {
			    	name: "ID",
			    	render: function(row, cell) {
			    		if (row.bean.published == true) {
			    			cell.setStyle({
			    				color: "green",
			    				fontWeight: "bold"
			    			});
			    		} else {
			    			cell.setStyle({
			    				color: "red",
			    				fontWeight: "bold"
			    			});			    			
			    		}
			    		
			    		return row.bean.loid;
			    	}
			    },
			    {
			    	name: "fromStop",
			    	property: "fromStopPoint.symbol"
			    },
			    {
			    	name: "toStop",
			    	property: "toStopPoint.symbol"
			    },
			],
			onClick: function(row) {
				h.displayConnection(row.bean);
			}
		});
		
		h.grid.fetch({
			rows: fullVariant.connections
		});
	},

	displayConnection: function(conn) {
		var h = this;
		
		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				h.displayConnectionDetails(model);
			},
			onFailure: function() {

			}
		});

		rest.getConnection({
			fromCode: conn.fromStopPoint.symbol,
			toCode: conn.toStopPoint.symbol
		});
	},

	displayConnectionDetails: function(emptyConnection) {
		var h = this;
		
		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				new cesip.schedules.ShapeDetails({
					inside: h.layout.getDefault(),
					shape: model,
					onSave: function() {
						var rest2 = new cesip.rest.REST({
							onSuccess: function(fullVariant) {
								h.displayGrid(fullVariant);
								h.displayForm(fullVariant);
							},
							onFailure: function(err) {
								alert(err);
							}
						});

						rest2.getVariantDetails(h.variant);
					}
				});
			},
			onFailure: function(err) {
				alert(err);
			}
		});
		rest.getConnectionDetails(emptyConnection);
	},
});