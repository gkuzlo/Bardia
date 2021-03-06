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

		h.layout = new UI.BorderLayout({
			inside: h.getMaterial(),
			south: {
				height: 60
			}
		});
		
		h.panel = new UI.Panel({
			inside: h.layout.getDefault(),
			buttons: h.config.buttons,
			title: h.config.title
		});

		h.listContent = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; overflow:auto",
			class: "list_content"
		});
		h.panel.getContent().update(h.listContent);
				
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
		        		 };
		        		 setTimeout(f, 0);
		        	 }
		         }
			]
		});
		
		h.listContent.on("click", "div.list-content-row", function(e, element) {
			if (h.config.onClick) {
				h.config.onClick(element);
			}
		});
		
		h.listContent.on("mouseover", "div.list-content-row", function(e, element) {
			if (h.config.onMouseOver) {
				h.config.onMouseOver(element);
			}
		});
		
		h.listContent.on("mouseout", "div.list-content-row", function(e, element) {
			if (h.config.onMouseOut) {
				h.config.onMouseOut(element);
			}
		});
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
				style: "position:relative; overflow:hidden",
				class: "list-content-row"				// row to jest klasa fake
			});
			row.bean = h.config.rows[i];

			if (h.config.render) {
				row.update(h.config.render(row));
			}

			h.listContent.insert(row);

			if (h.config.removable === true) {
				var removeFab = new Element("P", {
					style: "position:absolute; padding:0px; border-radius:50%; margin:0px; top:10px; right:10px; width:18px; height:18px; background-image:url('" + $ICON("close") + "'); overflow:hidden",
					className: "list-remove-button",
				});
				row.insert(removeFab);
				removeFab.row = row;
				
				removeFab.on("click", function(e) {
					if (h.config.onRemove) {
						h.config.onRemove(e.target.row);
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