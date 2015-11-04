
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
	                    	while(element.className !== "grid-row") {
	                    		element = element.parentElement;
	                    	}
	                        h.onClick(element.wrapper);
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
        
        h.setButtons();
    },
    
    setButtons: function() {
    	var h = this;
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
    },

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
    
    openDetails: function() {
        var h = this;

        h.root.find(h.id("grid-curtain")).dom().style.width = "100%";
        h.root.find(h.id("grid-curtain")).dom().style.background = "rgba(0,0,0,0.5)";
        h.root.find(h.id("grid-details-right")).dom().style.left = "0px";
        
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