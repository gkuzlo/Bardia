/*
 * @class UI.List
 */
UI.List = Class.create(UI.MaterialComponent, {
	/*
	 *
	 */
	initConfig: function(config) {            	
        this.config = Object.extend({
        	removable: false,
        	buttons: [],
        	rows: []
        }, config || {});
	},
	/*
	 *
	 */
	render: function() {
		var h = this;

		h.getMaterial().on("mousedown", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
		h.getMaterial().on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
		h.getMaterial().on("DOMMouseScroll", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});

		h.mainLayout = new UI.BorderLayout({
			inside: h.getMaterial(),
			north: {
				height: 60
			}
		});
		
		var titleDiv = new Element("DIV", {
			class: "list_header"
		});

		h.mainLayout.getNorth().update(titleDiv);
		titleDiv.update(h.config.title);

		h.layout = null;
		if (h.config.buttons && h.config.buttons.length > 0) {
			h.layout = new UI.BorderLayout({
				inside: h.mainLayout.getDefault(),
				north: {
					height: 60
				},
				south: {
					height: 60
				}
			});
		} else {
			h.layout = new UI.BorderLayout({
				inside: h.mainLayout.getDefault(),
				south: {
					height: 60
				}
			});
		}
		
		h.listContent = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; overflow:auto",
			class: "list_content"
		});
		h.layout.getDefault().update(h.listContent);
				
		new UI.Form({
			inside: h.layout.getSouth(),
			fields: [
		         {
		        	 property: "search",
		        	 label: "Szukaj",
		        	 disableTab: true,
		        	 onChanging: function(v) {
		        		 var f = function() {
		        			 h.filter(v);	 
		        		 }
		        		 setTimeout(f, 0);
		        	 }
		         }
			]
		});
		
		h.listContent.on("click", "div.row", function(e, element) {
			if (h.config.onClick) {
				h.config.onClick(element);
			}
		});
		
		h.listContent.on("mouseover", "div.row", function(e, element) {
			if (h.config.onMouseOver) {
				h.config.onMouseOver(element);
			}
		});
		
		h.listContent.on("mouseout", "div.row", function(e, element) {
			if (h.config.onMouseOut) {
				h.config.onMouseOut(element);
			}
		});

		if (h.layout.getNorth()) {
			new UI.FabToolbar({
				inside: h.layout.getNorth(),
				orientation: "left",
				buttons: h.config.buttons
			});
		}
	},
	/*
	 *  parametr data powinien zawsze zawierac kolekcję rows.
	 *  rows to sa obiekty JSON
	 * 
	 *  np:
	 * 
	 *  var elements = ["A", "B"];
	 *  
	 * 	list.fetch({
	 *     rows: elements
	 *  });
	 */
	fetch: function(data) {
		var h = this;

		h.config.rows = data.rows || [];
		h.listContent.update("");

		var i=0;
		for (i=0; i<h.config.rows.length; i++) {

			var row = new Element("DIV", {
				style: "overflow:hidden",
				class: "row"				// row to jest klasa fake
			});
			row.bean = h.config.rows[i];
						
			if (h.config.header !== undefined) {
				var _header = new Element("DIV", {
					style: "font-weight:bold; overflow:hidden"
				});
				_header.update(STRUTILS.compile(h.config.header, h.config.rows[i]));
				row.insert(_header);
			} else if (h.config.headerRenderer !== undefined) {
				var _header = new Element("DIV", {
					style: "font-weight:bold; overflow:hidden"
				});
				_header.update(h.config.headerRenderer(row, _header));
				row.insert(_header);				
			}

			if (h.config.footer !== undefined) {
				var _footer = new Element("DIV", {
					style: "overflow:hidden"
				});
				_footer.insert(STRUTILS.compile(h.config.footer, h.config.rows[i]));
				row.insert(_footer);
			} else if (h.config.footerRenderer !== undefined) {
				var _footer = new Element("DIV", {
					style: "overflow:hidden"
				});
				_footer.update(h.config.footerRenderer(row, _footer));
				row.insert(_footer);				
			}

			h.listContent.insert(row);
			
			if (h.config.removable === true) {
				new UI.Fab({
					inside: row,
					text: "",
					fill: "#ffffff",
					targetFill: "red",
					width: 18,
					height: 18,
					left: 21,
					top: 12,
					title: "Usuń",
					icon: "close",
					onClick: function(fab) {
						if (h.config.onRemove) {
							h.config.onRemove(fab.config.inside);
						}
					}
				});
			}
		}
	},
	/**
	 * odfiltrowanie wyświetlonych wierszy
	 */
	filter: function(v) {
		var h = this;

		var i=0;
		for (i=0; i<h.listContent.childElements().length; i++) {
			var child = h.listContent.childElements()[i];
			if (child.innerHTML.toLowerCase().indexOf(v.toLowerCase()) >= 0) {
				child.show();
			} else {
				child.hide();
			}
		}
	}
});