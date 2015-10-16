/**
 * 
 */
cesip.configuration.ShapesImports = bardia.oop.Class.create({
	
	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
		}, config));

        this.render();
	},

	render: function() {
		var h = this;

		h.grid = new bardia.grid.Grid({
			inside: h.inside,
			title: "Importy OSM",
			detailsWidth: "300px",
			columns: [{
		    	name: "name",
		    	property: "name"
			}, {
			    name: "Import date",
			    property: "importDate",
			    render: function(row) {
			    	return cesip.configuration.ShapesImports.DU.createFormatYYYYMMDD(row.bean.importDate);
			    }
			}],
			onClick: function(row) {
				h.showDetails(h.grid.openDetails(), row.bean);
			},
			buttons: [{
				name: "Nowy import",
				icon: "add_circle_outline",
				onClick: function() {
					h.showDetails(h.grid.openDetails(), {});
				}
			}, {
				name: "Odśwież",
				icon: "refresh",
				onClick: function() {
					h.fetchImports();
				}
			}]
		});
		
		h.fetchImports();
	},
	
	fetchImports: function() {
		var h = this;
		
		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				h.grid.fetch({
					rows: model.imports || []
				});
			},
			onFailure: function() {
				
			}
		});
		rest.getOSMImports();
	},

	showDetails: function(html, shapesImport) {
		var h = this;

		h.form = new bardia.form.Form({
			inside: html,
			fields: [
			    {
			    	label: "name",
			    	property: "name"
			    },
			    {
			    	label: "plik OSM",
			    	property: "osmFile",
			    	type: "File"
			    }
			],
			buttons: [
			    {
			    	name: "Importuj",
			    	icon: "save",
			    	onClick: function() {
			    		h.importOSM(h.form.getBean());
			    	}
			    }
			]
		});

		h.form.setBean(shapesImport);
	},
	/**
	 * 
	 */
	importOSM: function(importBean) {
		var h = this;
		
		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				h.fetchImports();
				h.grid.closeDetails();
			},
			onFailure: function() {
				
			}
		});
		rest.importOSM(importBean);
	}
});

cesip.configuration.ShapesImports.DU = new bardia.utils.DateUtils();