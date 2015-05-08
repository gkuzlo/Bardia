/*
 *
 */
UI.Menu = Class.create(UI.MaterialComponent, {
	/**
	 *
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        	items: []
        }, config || {});
	},
	/**
	 *
	 */
	render: function() {
		var h = this;
		
		h.panel = new UI.Panel({
			inside: h.getMaterial(),
			title: h.config.title
		});

		h.rowsContent = new Element("DIV", {
			class: "list_content"
		});
				
		h.listContent = new Element("DIV", {
			class: "list"
		});

		h.listContent.insert(h.rowsContent);

		h.panel.getMaterial().update(h.listContent);
		
		this.rowsContent.on("click", "div.row", function(e, element) {
			if (element.bean.onClick) {
				element.bean.onClick(element);
			}
		});
		
		this.fetch();
	},
	/*
	 * parametr data powinien zawsze zawierac kolekcję rows.
	 * rows to sa obiekty JSON
	 */
	fetch: function() {
		var h = this;

		h.rowsContent.update("");

		var i=0;
		for (i=0; i<h.config.items.length; i++) {
			if (h.config.items[i].access == undefined || h.config.items[i].access == UI.HIDDEN) {
				continue;
			}

			var row = new Element("DIV", {
				class: "row"				// row to jest klasa fake
			});
			row.bean = h.config.items[i];
						
			if (h.config.header !== undefined) {
				var _header = new Element("DIV", {
					style: "font-weight:bold"
				});
				_header.update(STRUTILS.compile(h.config.header, row.bean));
				row.insert(_header);
			} else if (h.config.headerRenderer !== undefined) {
				var _header = new Element("DIV", {
					style: "font-weight:bold"
				});
				_header.update(h.config.headerRenderer(row));
				row.insert(_header);				
			}

			if (h.config.footer !== undefined) {
				var _footer = new Element("DIV", {
					
				});
				_footer.insert(STRUTILS.compile(h.config.footer, row.bean));
				row.insert(_footer);
			} else if (h.config.footerRenderer !== undefined) {
				var _footer = new Element("DIV", {
				});
				_footer.update(h.config.footerRenderer(row));
				row.insert(_footer);				
			}

			h.rowsContent.insert(row);
		}
	}
});