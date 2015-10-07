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
            bgColor: "#ebf0ee",
            columns: [
                {
                	name: "",
                	width: 100
                }
            ],
            rows: [
            ],
            quickSearch: true,
            detailsWidth: "90%",
            descriptor: {
            	paging: false,
            	pageSize: 10,
            	currentPage: 1,
            	totalAmount: 100
            }
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
    		
    		if (h.config.quickSearch === true || h.config.descriptor.paging == true) {
    			mainLayoutConfig.south = {
    				height: 60
    			}
    		}

    		h.mainLayout = new UI.BorderLayout(mainLayoutConfig);

    		h.panel = new UI.Panel({
    			inside: h.mainLayout.getDefault(),
    			buttons: h.config.buttons,
    			title: h.config.title,
    			bgColor: h.config.bgColor
    		});

    		h.columnsContent = new Element("DIV", {
    			class: "heads-content",
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

    		if (h.mainLayout.getSouth()) {

                var southContainer = new Element("DIV", {
                    style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; display:flex; flex-direction:row; overflow:hidden; background+color:yellow"
                });

    		    h.mainLayout.getSouth().insert(southContainer);

    		    var nextInside = new Element("DIV", {
    		        style: "position:relative; width:200px;"
    		    });
    		    southContainer.insert(nextInside);

	    		new UI.Form({
	    			inside: nextInside,
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

    		    h.pagingFormInside = new Element("DIV", {
    		        style: "position:relative; width:200px"
    		    });
    		    southContainer.insert(h.pagingFormInside);

    		    h.displayPagingForm(h.pagingFormInside);
    		}

    	h.panel.setTitle(h.config.title);

    	h.fetch({
    		rows: [],
    		descriptor: h.config.descriptor
    	});
    },
    displayPagingForm: function() {
        var h = this;

        if (h.pagingFormInside) {
			h.pagingForm = new UI.Form({
				inside: h.pagingFormInside,
				fields: [
					 {
						 property: "currentPage",
						 label: $MSG("Page") + ": " + h.config.descriptor.currentPage + " / " + (h.config.descriptor.totalAmount / h.config.descriptor.pageSize).toFixed(0),
						 type: "Increment",
						 min: 1,
						 max: (h.config.descriptor.totalAmount / h.config.descriptor.pageSize).toFixed(0),
						 onChange: function(value) {
						    this.setTitle($MSG("Page") + ": " + value + " / " + (h.config.descriptor.totalAmount / h.config.descriptor.pageSize).toFixed(0));
						 	if (h.config.onPageChanged) {
						 		h.config.onPageChanged(value);
						 	}
						 }
					 }
				]
			});
			h.pagingForm.setBean(h.config.descriptor);
        }
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
				style: "width:" + (column.width) + "px; text-align:" + (column.align || "left"),
				class: "grid-column bg_white fg_main"
			});

			div.update(column.name);
			div.columnBean = column;

			return div;
		})
		.forEach(function(div) {
		    div.on("click", function(e) {
		        h.selectColumn(e.target);
		    });

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
    				style: "width:" + (config.width) + "px; text-align:" + (config.align || "left"),
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

		if (h.pagingForm && model.descriptor) {
		    h.config.descriptor = model.descriptor;
		    h.displayPagingForm();
		}
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
	},
	/**
	 *
	 */
	selectColumn: function(columnDiv) {
		var h = this;

    	var containerLeft = h.columnsContent.getBoundingClientRect().left;

    	h.columnsContent.pseudoStyle("before", "width",  (columnDiv.getBoundingClientRect().width - 1) + "px");
    	h.columnsContent.pseudoStyle("before", "transform", "translateX(" + (columnDiv.getBoundingClientRect().left - containerLeft) + "px)");

    	h.selectByColumn(columnDiv);
	},
	/**
	 *
	 */
	selectByColumn: function(columnDiv) {
	    var h = this;

        var columnDefinition = columnDiv.columnBean;

        var compareFunction = null;

        if (!h.config.descriptor.sortByColumn || h.config.descriptor.sortByColumn !== columnDefinition) {
            h.config.descriptor.sortByColumn = columnDefinition;
            h.config.descriptor.asc = true;
        } else {
            h.config.descriptor.asc = !h.config.descriptor.asc;
        }

        var ascDesc = ">";
        if (h.config.descriptor.asc == false) {
            ascDesc = "<";
        }

        if (columnDefinition.property) {
            compareFunction = function(row1, row2) {
                var str1 = eval("row1.bean." + columnDefinition.property);
                var str2 = eval("row2.bean." + columnDefinition.property);

                return eval("str1" + ascDesc + "str2");
            }
        }

	    h.rows.sort(function(row1, row2) {
	        var result = compareFunction(row1, row2);
	        return result;
	    });

	    h.rowsContent.update();

	    h.rows.forEach(function(row) {
	        h.rowsContent.insert(row);
	    });
	},
    /**
     *
     */
    openDetails: function() {
        var h = this;

        if (h.detailsMaterial === undefined) {
            h.detailsMaterial = new UI.Material({
                inside: h.config.inside,
                modal: true,
                position: "top:0px; left:0px; width:" + h.config.detailsWidth + "; bottom:0px"
            });
        }

        h.detailsMaterial.show();

        return h.detailsMaterial;
    },
    closeDetails: function() {
        var h = this;

        if (h.detailsMaterial !== undefined) {
            h.detailsMaterial.hide();
        }
    },
    setButtons: function(buttons) {
    	var h = this;
    	h.panel.setButtons(buttons);
    }
});