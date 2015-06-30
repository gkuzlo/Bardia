/**
 * @class UI.Grid
 */
UI.Grid = Class.create(UI.MaterialComponent, {
	/**
	 * @param initConfig
	 */
    initConfig: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            columns: [
                {
                	name: "",
                	width: 100
                }
            ],
            rows: [
            ],
            quickSearch: true
        }, config || {});
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;
    	
    		var mainLayoutConfig = {
    			inside: h.getMaterial()	
    		}
    		
    		if (h.config.quickSearch === true) {
    			mainLayoutConfig.south = {
    				height: 60
    			}
    		}

    		h.mainLayout = new UI.BorderLayout(mainLayoutConfig);

    		h.panel = new UI.Panel({
    			inside: h.mainLayout.getDefault(),
    			buttons: h.config.buttons,
    			title: h.config.title
    		});

    		h.columnsContent = new Element("DIV", {
    			class: "grid_content",
    			style: "height:50px; top:2px; left:5px; border:2px solid lightGrey; border-width:0px 0px 2px 0px; overflow:hidden"
    		});
    		h.panel.getContent().insert(h.columnsContent);

    		h.rowsContent = new Element("DIV", {
    			class: "grid_content",
    			style: "bottom:0px; top:70px; left:5px"
    		});
    		h.rowsContent.on("scroll", function(e) {
    			if (h.config.onScrollTop) {
    				h.config.onScrollTop(e.target.scrollTop);
    			}
    		});
    		h.panel.getContent().insert(h.rowsContent);

    		h.rowsContent.on("click", "div.grid-row", function(e, element) {
    			if (h.config.onClick) {
    				h.config.onClick(element);
    			}
    		});
    		
    		h.rowsContent.on("mouseover", "div.grid-row", function(e, element) {
    			element.addClassName("grid-row-selected");
    			if (h.config.onMouseOver) {
    				h.config.onMouseOver(element);
    			}
    		});
    		h.rowsContent.on("mouseout", "div.grid-row-selected", function(e, element) {
    			element.removeClassName("grid-row-selected");
    		});

    		if (h.config.quickSearch === true) {
	    		new UI.Form({
	    			inside: h.mainLayout.getSouth(),
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
    		}

    	h.panel.setTitle(h.config.title);

    	h.fetch({
    		rows: []
    	});
    },
    /**
     * @method setScrollTop
     */
    setScrollTop: function(pixels) {
    	var h = this;
    		h.rowsContent.scrollTop = pixels;
    },
    /**
     * @method setTitle
     */
    setTitle: function(title) {
    	var h = this;
    		h.panel.setTitle(title);
    },
    /**
     * @method fetch
     *
     * Załadowanie grida wierszami z danymi
     */
    fetch: function(model) {
    	var h = this;

    	h.columnsContent.update();
    	h.rowsContent.update();

		var head = new Element("DIV", {
			class: "grid-column-head",
		});

		h.config.columns.map(function(column) {
			column.width = column.width || 100;

			var div = new Element("P", {
				style: "width:" + (column.width) + "px",
				class: "grid-column bg_white fg_main"
			});

			div.update(column.name);

			return div;
		})
		.forEach(function(div) {
			head.insert(div);
		});
		h.columnsContent.insert(head);

		h.rows = [];
		
		var i=0;
		for (i=0; i<model.rows.length; i++) {

			var bean = model.rows[i];
			
    		var row = new Element("DIV", {
    			class: "grid-row"
    		});
    		h.rows.push(row);

    		row.bean = bean;

    		h.config.columns.forEach(function(config) {
    			var cell = new Element("DIV", {
    				style: "width:" + (config.width) + "px",
    				class: "grid-cell fg_main"
    			});

    			row.insert(cell);

    			if (config.render !== undefined) {
    				cell.update(config.render(row, cell));
    			} else {
    				cell.update(eval("bean." + config.property));
    			}
    		});

    		h.rowsContent.insert(row);
		};
    },
    selectRowByBean: function(bean) {
    	var h = this;
    	for(var i=0; i<h.rows.length; i++) {
    		if (h.rows[i].bean === bean) {
    			h.rows[i].click();
    		}
    	}
    },
    /**
     * @method filter
     * @param v
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
