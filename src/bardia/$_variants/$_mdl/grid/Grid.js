
bardia.grid.Grid = bardia.oop.Class.create({
	
    detailsWidth: "400px",

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
        	title: "Insert tile here. . .",
        	clickAfterFetch: false,
        	serial: "S_" + (Math.random()*1000000).toFixed(0),
        }, config));
        
        this.render();
    },

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
	                $_append: h.columns.map(function(column) {
	                    return {
	                        $_tag: "div",
	                        class: "grid-header",
	                        style: "width:" + (column.width || 150) + "px",
	                        $_append: column.name
	                    };
	                })
	            }, {
	                $_tag: "div",
	                class: "grid-rows",
	                id: h.id("grid-rows"),
	                $_on: {
	                    "click": function(e) {
	                    	var element = e.target; 
	                    	while(element.className && element.className !== "grid-row") {
	                    		element = element.parentElement;
	                    	}
	                    	if (element.wrapper && element.className && element.className == "grid-row") {
	                    		h.onClick(element.wrapper);
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
                        h.closeDetails();
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

        h.inside.update(h.root);
        
        h.setButtons(h.buttons);
        h.setTitle(h.title);
        h.createSearchField();
    },
    
    setButtons: function(buttons) {
    	var h = this;
    	h.buttons = buttons;
    	
    	h.root.find(h.id("toolbar")).update();

    	if (h.buttons) {
    		h.buttons.forEach(function(button, index) {
    			
    			var el = $_element({
    				$_tag: "button",
    				class: "mdl-button mdl-js-button mdl-button--icon",
    				$_append: [{
    					$_tag: "div",
    					class: "icon material-icons",
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
			class: "grid-title",
			$_append: h.title
		});

    	h.root.find(h.id("toolbar")).insert(el);
    },

    setTitle: function(title) {
    	var h = this;

		h.title = title;
		h.setButtons(h.buttons);
    },

    createSearchField: function() {
    	var h = this;
    	
    	var textSearch = $_element({
    		$_tag: "div",
    		class: "mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right",
    		style: "position:absolute; right:10px; top:0px; margin-top:-8px",
    		$_append: [{
    			$_tag: "label",
    			class: "mdl-button mdl-js-button mdl-button--icon",
    			"for": h.id("search_input"),
    			$_append: [{
    				$_tag: "i",
    				class: "material-icons",
    				$_append: "search"
    			}]
    		}, {
    			$_tag: "div",
    			class: "mdl-textfield__expandable-holder",
    			$_append: [{
    				$_tag: "input",
    				class: "mdl-textfield__input",
    				style: "background-color:transparent; font-size:14px; font-family:Arial; margin-bottom:4px",
    				type: "text",
    				name: "sample",
    			    id: h.id("search_input"),
    			    $_on: {
    			    	keyup: function(e) {
    			    		h.filterRows(e.target.value);
    			    	}
    			    }
    			}]
    		}]
    	});
    	
    	h.root.find(h.id("toolbar")).insert(textSearch);
    	
    	$_upgradeElement(textSearch);
    },

    /**
     * 
     */
    fetch: function(model) {
        var h = this;

        var rowsDiv = h.root.find(h.id("grid-rows"));
        rowsDiv.update();

        h.firstRow = null;
        
        (model.rows || []).forEach(function(row) {
            var rowDiv = $_element({
                $_tag: "div",
                class: "grid-row",
            });
            rowsDiv.insert(rowDiv);
        	rowDiv.bean = row;
        	
        	h.firstRow = h.firstRow || rowDiv;

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
            		} else {
            			cell.insert(rendered);
            		}
            	} else {
                	cell.insert("" + eval("rowDiv.bean." + column.property));
            	}

                rowDiv.insert(cell);
            });
        });
        
        if (h.clickAfterFetch == true) {
        	if (h.firstRow) {
        		h.firstRow.dom().click();
        	}
        }

    },

    filterRows: function(value) {
    	var h = this;

    	var rowsDiv = h.root.find(h.id("grid-rows"));

    	for (var i=0; i<rowsDiv.dom().childNodes.length; i++) {
    		if (rowsDiv.dom().childNodes[i].innerHTML.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
    			rowsDiv.dom().childNodes[i].style.display = "flex"
    		} else {
    			rowsDiv.dom().childNodes[i].style.display = "none"
    		}
    	}
    },

    openDetails: function(width) {
        var h = this;

        h.detailsWidth = width || h.detailsWidth;

        h.root.find(h.id("grid-curtain")).dom().style.width = "100%";
        h.root.find(h.id("grid-curtain")).dom().style.background = "rgba(0,0,0,0.5)";
        h.root.find(h.id("grid-details-right")).dom().style.left = "0px";
        h.root.find(h.id("grid-details-right")).dom().style.width = h.detailsWidth;
        
        return h.root.find(h.id("grid-details-right"));
    },
    
    closeDetails: function() {
        var h = this;

        h.root.find(h.id("grid-curtain")).dom().style.width = "0px";
        h.root.find(h.id("grid-curtain")).dom().style.background = "rgba(0,0,0,0.0)";
        h.root.find(h.id("grid-details-right")).dom().style.left = "-" + h.detailsWidth;
    },

    id: function(name) {
    	return this.serial + name;
    }
});