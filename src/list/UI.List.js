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

		h.config.inside.on("mousedown", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
		h.config.inside.on("click", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});
		
		h.config.inside.on("DOMMouseScroll", function(e) {
			e.cancelBubble = true;
			e.returnValue = false;
		});

		h.panel = new UI.Panel({
			inside: h.getMaterial(),
			title: h.config.title,
			className: "list_header"
		});

		h.rowsContent = new Element("DIV", {
			class: "list_content"
		});
		
		h.rowsFooter = new Element("DIV", {
			class: "list_footer"
		});
		
		h.listContent = new Element("DIV", {
			class: "list"
		});
				
		new UI.Form({
			inside: h.rowsFooter,
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
		
		h.listContent.insert(h.rowsContent);
		h.listContent.insert(h.rowsFooter);

		h.panel.getContent().update(h.listContent);

		this.rowsContent.on("click", "div.row", function(e, element) {
			if (h.config.onClick) {
				h.config.onClick(element);
			}
		});
		
		var b = 0;
		for (b=0; b < h.config.buttons.length; b++) {
			h.config.buttons[b].inside = h.getMaterial(); 
			h.config.buttons[b].top = 35;
			h.config.buttons[b].left = 10 + 50 * (b);
			
			var fab = new UI.Fab(h.config.buttons[b]);
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
		h.rowsContent.update("");

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

			h.rowsContent.insert(row);
			
			var rr = row;

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
					zHeight: 3,
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
		for (i=0; i<h.rowsContent.childElements().length; i++) {
			var child = h.rowsContent.childElements()[i];
			if (child.innerHTML.toLowerCase().indexOf(v.toLowerCase()) >= 0) {
				child.show();
			} else {
				child.hide();
			}
		}
	}
});