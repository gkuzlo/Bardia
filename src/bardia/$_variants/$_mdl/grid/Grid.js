
bardia.grid.Grid = bardia.oop.Class.create({

    detailsWidth: "400px",
    /**
     * 
     */
    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
        	title: "Insert tile here. . .",
        	clickAfterFetch: false,
        	serial: "S_" + (Math.random()*1000000).toFixed(0),
        	visibleRowsCount: 0
        }, config));

        this.render();
    },
    /**
     * 
     */
    render: function() {
        var h = this;
        
        h.root = $_element({
        	$_tag: "div",
        	class: "grid-container",
        	$_append:[{
        		$_tag: "div",
        		id: h.id("toolbar"),
        		class: "grid-top grid-bg",
        	}, {
	            $_tag: "div",
	            class: "grid-content",
	            $_append: [{
	                $_tag: "div",
	                class: "grid-headers",
	                id: h.id("grid-headers"),
	                $_append: h.columns.map(function(column, index) {
	                    return {
	                        $_tag: "div",
	                        class: "grid-header",
	                        id: "grid-column-index" + index,
	                        style: "width:" + (column.width || 150) + "px",
	                        $_props: {
		                        property: column.property,
		                        sorter: column.sorter,
	                        },
	                        $_append: [{
	                        	$_tag: "div",
	                        	id: "grid_column_title_" + index,
	                        	style: "position:relative; overflow:hidden; width:" + ((column.width || 150) - 15) + "px;",
	                        }, {
	                        	$_tag: "div",
	        	                class: "material-icons grid-column-header-sort",
	        	                id: "sort-asc",
	        	                style: "position:absolute; right:0px; top:-35px; color:#707E85; cursor:pointer;",
	        	                $_append: "keyboard_arrow_down"
	                        }, {
	                        	$_tag: "div",
	        	                class: "material-icons grid-column-header-sort",
	        	                id: "sort-desc",
	        	                style: "position:absolute; right:0px; top:60px; color:#707E85; cursor:pointer;",
	        	                $_append: "keyboard_arrow_up"
	                        }],
	                        $_on: {
	                        	click: function(e) {
	                        		h.sortByColumn(h.root.find("grid-column-index" + index));
	                        	}
	                        }
	                    };
	                })
	            }, {
	                $_tag: "div",
	                class: "grid-rows",
	                id: h.id("grid-rows"),
	                $_on: {
	                    "click": function(e) {
	                    	var element = e.target; 
	                    	while(element.className && element.className.indexOf("grid-row-") < 0) {
	                    		element = element.parentElement;
	                    	}
	                    	if (element.wrapper && element.className && element.className.indexOf("grid-row-") >= 0) {
	                    		if (h.onClick) {
	                    			h.onClick(element.wrapper);
	                    		}
	                    	} else {
	                    		console.log("Element dont have wrapper .....");
	                    	}
	                    },
	                    "mouseover": function(e) {
	                    	var element = e.target; 
	                    	while(element.className && element.className.indexOf("grid-row-") < 0) {
	                    		element = element.parentElement;
	                    	}
	                    	if (element.wrapper && element.className && element.className.indexOf("grid-row-") >= 0) {
	                    		if (h.onMouseOver) {
	                    			h.onMouseOver(element.wrapper);
	                    		}
	                    	}
	                    },
	                    "scroll": function(e) {
                			if (h.onScrollTop) {
                				h.onScrollTop(e.target.scrollTop);
                			}
	                    }
	                }
	            }]
        	}, {
                $_tag: "div",
                class: "grid-curtain",
                id: h.id("grid-curtain"),
                $_on: {
                    "click": function() {
                        //h.closeDetails();
                    }
                },
                $_append: [{
                    $_tag: "div",
                    class: "grid-details-right",
                    id: h.id("grid-details-right"),
                    style: "width:" + h.detailsWidth + "; left:-" + h.detailsWidth, 
                    $_on: {
                    	"click": function(e) {
                    		e.stopPropagation();
                    	}
                    }
                }]
            }]
        });

        h.root.insert($_element({
        	$_tag: "div",
        	class: "bardia-progress",
        	id: h.id("grid-progress"),
        	$_append: [{
        		$_tag: "div",
        		class: "bardia-progress-label-container",
        		$_append: [{
            		$_tag: "div",
            		class: "material-icons bardia-progress-icon",
            		$_append: "replay"
            	}, {
            		$_tag: "div",
            		id: h.id("grid-progress-label"),
            		class: "bardia-progress-label"
            	}]
        	}]
        }));

        h.inside.update(h.root);

        h.columns.forEach(function(column, index) {
			var mat = new bardia.controlls.ScrollingCell({
				value: column.name
			}).getMaterial();
			h.root.find("grid_column_title_" + index).update(mat);
        });

		h.setButtons(h.buttons);
		h.setTitle(h.title);
		h.createSearchField();
    },
    /**
     * 
     */
    setScrollTop: function(pixels) {
    	var h = this;
    		h.root.find(h.id("grid-rows")).dom().scrollTop = pixels;
    },
    /**
     * 
     */
    getScrollTop: function() {
    	var h = this;
		return h.root.find(h.id("grid-rows")).dom().scrollTop;
    },
    /**
     * 
     */
    selectRowByBean: function(bean) {
    	var h = this;
    	for(var i=0; i<h.rowsElements.length; i++) {
    		if (h.rowsElements[i].bean === bean) {
    			h.rowsElements[i].dom().click();
    			h.rowsElements[i].dom().focus();
    			break;
    		}
    	}
    },
    /**
     * 
     */
    findRowByBean: function(bean) {
    	var h = this;
    	var result = null;
    	
    	for(var i=0; i<h.rowsElements.length; i++) {
    		if (h.rowsElements[i].bean === bean) {
    			result = h.rowsElements[i];
    			break;
    		}
    	}

    	return result;
    },
    /**
     * 
     */
    selectRowByAttribute: function(attribute, value) {
    	var h = this;
    	for(var i=0; i<h.rowsElements.length; i++) {
    		if (h.rowsElements[i].bean[attribute] === value) {
    			h.rowsElements[i].dom().click();
    			h.rowsElements[i].dom().focus();
    			break;
    		}
    	}
    },
    /**
     * 
     */
    sortByColumn: function(columnHeader) {
    	var h = this;

    	if (h.sortedColumn) {
    		if (h.sortedColumn == columnHeader) {
    			h.reverseSorting(h.sortedColumn);
    		} else {
    			h.hideSorting(h.sortedColumn);
    			h.reverseSorting(columnHeader);
    		}
    	} else {
    		h.reverseSorting(columnHeader);
    	}
    	
    	h.sortedColumn = columnHeader;
    	h.sort(h.sortedColumn);
    },
    /**
     * 
     */
    sortByColumnIndex: function(index) {
    	var h = this;
	    	h.sortByColumn(h.root.find("grid-column-index" + index));
    },
    /**
     * 
     */
    reverseSorting: function(columnHeader) {
    	var h = this;
    	
    	if (!columnHeader.sortAsc) {
    		columnHeader.sortAsc = true;
    	} else {
    		columnHeader.sortAsc = !columnHeader.sortAsc;
    	}
    	
    	if (true == columnHeader.sortAsc) {
    		columnHeader.find("sort-asc").setStyle({
        		top: "10px"
        	});
    		columnHeader.find("sort-desc").setStyle({
        		top: "60px"
        	});    		
    	} else {
    		columnHeader.find("sort-asc").setStyle({
        		top: "-30px"
        	});
    		columnHeader.find("sort-desc").setStyle({
        		top: "10px"
        	});    		
    	}
    },
    /**
     * 
     */
    hideSorting: function(columnHeader) {
    	var h = this;
    	
    	columnHeader.find("sort-desc").setStyle({
    		top: "60px"
    	});
    	columnHeader.find("sort-asc").setStyle({
    		top: "-30px"
    	});
    },
    /**
     * 
     */
    setButtons: function(buttons) {
    	var h = this;

    	h.buttons = buttons;
    	h.root.find(h.id("toolbar")).update();

    	if (h.buttons) {
    		h.buttons.forEach(function(button, index) {
    			var el = $_element({
    				$_tag: "button",
    				class: "mdl-button mdl-js-button mdl-button--icon",
    				title: button.name,
    				$_append: [{
    					$_tag: "div",
    					class: "icon material-icons grid-icon",
    					style: button.style || "",
    					$_append: button.icon,
    				}],
    				$_on: {
    					"click": function(e) {
    						button.onClick();
    					}
    				}
    			});
    			h.root.find(h.id("toolbar")).insert(el);
    		});
    	}

		var el = $_element({
			$_tag: "div",
			id: h.id("grid_title"),
			class: "grid-title",
			$_append: "[" + h.getVisibleRowsCount() + "] " + h.title
		});

    	h.root.find(h.id("toolbar")).insert(el);
    },
    
    setTitle: function(title) {
    	var h = this;
		h.title = title;
		//h.root.find(h.id("grid_title")).update("[" + h.getVisibleRowsCount() +"] " + h.title);
		h.root.find(h.id("grid_title")).update(h.title);
    },

    createSearchField: function() {
    	var h = this;
    	
    	h.textSearch = $_element({
    		$_tag: "div",
    		style: "position:relative; display:flex; flex-direction:row; top:3px; line-height:30px;  margin:0px; padding:0px;",
    		$_append: [{
    			$_tag: "div",
    			id: "search_div",
    			style: "overflow:hidden; width:0px; margin-left:20px; padding:0px;",
    			class: "grid-animated",
    			$_append: [{
    				$_tag: "input",
    				class: "mdl-textfield__input",
    				style: "background-color:transparent; font-size:14px; font-family:Arial; margin-bottom:4px; outline:none; box-shadow:none; border:1px solid white; border-width:0px 0px 1px 0px;",
    				type: "text",
    				name: "sample",
    			    id: h.id("search_input"),
    			    $_on: {
    			    	keyup: function(e) {
    			    		h.filterRows(e.target.value);
    			    	},
    			    	blur: function(e) {
    			    		if (!e.target.value || e.target.value == "" || e.target.value == null) {
    			    			h.textSearch.find("search_div").dom().style.width = "0px";
    			    		}
    			    	}
    			    }
    			}],
    		}, {
    			$_tag: "div",
    			"for": h.id("search_input"),
    			id: h.id("search_icon"),
    			$_append: [{
    				$_tag: "i",
    				class: "material-icons",
    				style: "cursor:pointer",
    				$_append: "search"
    			}],
    			$_on: {
			    	click: function() {
			    		h.textSearch.find("search_div").dom().style.width = "150px";
			    		h.textSearch.find(h.id("search_input")).dom().focus();
			    	}
    			}
    		}]
    	});
    	
    	h.root.find(h.id("toolbar")).insert(h.textSearch);
    	
    	$_upgradeElement(h.textSearch);
    },
    /**
     * 
     */
    sort: function(columnHeader) {
    	var h = this;

    	if (h.model && h.model.rows) {
    		var sorter = undefined;
    		var props = columnHeader.$_props;

    		if (props.sorter) {
    			sorter = function(a, b) {
    				return props.sorter(a, b);
        		}
    		} else if (props.property) {
    			sorter = function(a, b) {
    				if (a[props.property] && b[props.property]) {
    					return ("" + a[props.property]).localeCompare("" + b[props.property]);
    				} else {
    					return 0;
    				}
        		}
    		}

    		if (sorter) {
	    		h.model.rows.sort(function(a, b) {
	    			if (true == columnHeader.sortAsc) {
	    				return sorter(a, b);	
	    			} else {
	    				return sorter(b, a);
	    			}
	    		});

	    		setTimeout(function() {
	    			h.fetchNoSort(h.model);
	    		}, 500);
    		}
    	}
    },
    getVisibleRowsCount: function() {
    	return this.visibleRowsCount;
    },
    /**
     * 
     */
    fetch: function(model) {
        var h = this;
        
        if (h.model) {
        	delete h.model;
        }
        h.model = model;
        
        h.visibleRowsCount = model.rows.length;
                
        if (undefined == h.sortedColumn) {
        	h.fetchNoSort(h.model);
        } else {        	
        	h.sort(h.sortedColumn);
        }
        
        var filterValue = h.textSearch.find(h.id("search_input")).dom().value;
        if (filterValue && filterValue.trim() != "") {
        	h.filterRows(filterValue);
        }

        h.setTitle(h.title);
    },
    /**
     * 
     */
    fetchNoSort: function(model) {
        var h = this;

        if (h.rowsElements) {
        	delete h.rowsElements;
        }
        h.rowsElements = [];

        var rowsDiv = h.root.find(h.id("grid-rows"));
        rowsDiv.update();

        h.firstRow = undefined;

        (model.rows || []).forEach(function(row, index) {
            var rowDiv = $_element({
                $_tag: "div",
                class: "grid-row-",
                tabIndex: index
            });
            rowsDiv.insert(rowDiv);
        	rowDiv.bean = row;

        	h.rowsElements.push(rowDiv);

            h.columns.forEach(function(column) {            	
            	var cell = $_element({
                    $_tag: "div",
                    class: "grid-cell",
                    style: "width:" + (column.width || 150) + "px",
                });

            	if (column.render) {
            		var rendered = column.render(rowDiv, cell);	
            		if (rendered && rendered != null && rendered.$_tag && rendered.$_tag != null) {
            			cell.insert($_element(rendered));
            		} else if (rendered && rendered.dom !== undefined) {
            			cell.insert(rendered);
            		} else {
            			cell.insert("" + rendered);
            		}
            	} else {
            		var value = eval("rowDiv.bean." + column.property);
            		if (value === undefined || value === null) {
            			value = "";
            		}
                	cell.insert("" + value);
            	}

                rowDiv.insert(cell);
            });
        });

//        if (h.clickAfterFetch == true) {
//        	if (h.firstRow) {
//        		h.firstRow.dom().click();
//        	}
//        }        
    },
    /**
     * 
     */
    filterRows: function(value) {
    	var h = this;

    	h.visibleRowsCount = 0;
    	
    	if (h.textSearch.find(h.id("search_input")).dom().value !== value) {
    		h.textSearch.find(h.id("search_input")).dom().value = value;
    		h.textSearch.find(h.id("search_icon")).dom().click();
    	}
    	
    	var values = value.toLowerCase().split(" ");
    	
    	var rowsDiv = h.root.find(h.id("grid-rows"));
    	
    	h.firstRow = undefined;

    	for (var i=0; i<rowsDiv.dom().childNodes.length; i++) {
    		var cellValue = rowsDiv.dom().childNodes[i].innerHTML.toLowerCase();
    		
    		var exists = false;
    		values.some(function(val) {
    			if(cellValue.indexOf(val.trim()) >= 0) {
    				exists = true;
    				return true;
    			}
    		});

    		if (true == exists) {
    			rowsDiv.dom().childNodes[i].style.display = "flex";
    			h.firstRow = h.firstRow || rowsDiv.dom().childNodes[i]; 
    			h.visibleRowsCount++;
    		} else {
    			rowsDiv.dom().childNodes[i].style.display = "none";
    		}
    	}
    	
        if (h.clickAfterFetch == true) {
        	if (h.firstRow) {
        		h.firstRow.click();
        	}
        }

    	if (h.onFiltered) {
    		h.onFiltered();
    	}
    },
    
    getVisibleBeans: function() {
    	var h = this;

    	var beans = [];
    	
    	h.rowsElements.forEach(function(row) {
			if (row.dom().style.display == "flex") {
				beans.push(row.bean);
			}    		
    	});
    	
    	return beans;
    },

    openDetails: function(width) {
        var h = this;

        h.detailsWidth = width || h.detailsWidth;

        h.root.find(h.id("grid-curtain")).dom().style.width = "100%";
        h.root.find(h.id("grid-curtain")).dom().style.background = "rgba(0,0,0,0.5)";
        h.root.find(h.id("grid-details-right")).dom().style.left = "0px";
        h.root.find(h.id("grid-details-right")).dom().style.width = h.detailsWidth;
        
        var result = h.root.find(h.id("grid-details-right"));
        result.update();

        return result;
    },

    closeDetails: function() {
        var h = this;

        h.root.find(h.id("grid-curtain")).dom().style.width = "0px";
        h.root.find(h.id("grid-curtain")).dom().style.background = "rgba(0,0,0,0.0)";
        h.root.find(h.id("grid-details-right")).dom().style.left = "-" + h.detailsWidth;
    },

    id: function(name) {
    	return this.serial + name;
    },

    openProgress: function(message) {
    	var h = this;
    	h.root.find(h.id("grid-progress")).addClassName("bardia-progress-is-active");
    	if (message) {
    		h.root.find(h.id("grid-progress-label")).update(message); 		
    	}
    },

    closeProgress: function() {
    	var h = this;
    	h.root.find(h.id("grid-progress")).removeClassName("bardia-progress-is-active");
    },
});