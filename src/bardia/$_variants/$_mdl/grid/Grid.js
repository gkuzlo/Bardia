
bardia.grid.Grid = bardia.oop.Class.create({
	
    detailsWidth: "400px",

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
        	title: "Insert tile here. . ."
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
        		id: "toolbar",
        		class: "grid-top grid-bg",
        	}, {
	            $_tag: "div",
	            class: "grid-content",
	            $_append: [{
	                $_tag: "div",
	                class: "grid-headers",
	                id: "grid-headers",
	                $_append: h.columns.map(function(column) {
	                    return {
	                        $_tag: "div",
	                        class: "grid-header",
	                        $_append: column.name
	                    }
	                })
	            }, {
	                $_tag: "div",
	                class: "grid-rows",
	                id: "grid-rows"
	            }, {
	                $_tag: "div",
	                class: "grid-curtain",
	                id: "grid-curtain",
	                $_on: {
	                    "click": function() {
	                        h.closeDetails();
	                    }
	                },
	                $_append: [{
	                    $_tag: "div",
	                    class: "grid-details-right",
	                    id: "grid-details-right"
	                }]
	            }]
        	}]
        });

        h.inside.update(h.root);
        
        h.setButtons();
    },
    
    setButtons: function() {
    	var h = this;
    	if (h.buttons) {
    		h.buttons.forEach(function(button) {
    			h.root.find("toolbar").insert($_element({
    				$_tag: "button",
    				class: "mdl-button mdl-js-button mdl-button--icon",
    				title: button.name,
    				$_append: [{
    					$_tag: "i",
    					class: "material-icons",
    					$_append: button.icon
    				}],
    				$_on: {
    					"click": function(e) {
    						alert(button.icon);
    					}
    				}
    			}));
    		});
    	}
    },

    fetch: function(model) {
        var h = this;

        var rowsDiv = h.root.find("grid-rows");
        rowsDiv.update();

        (model.rows || []).forEach(function(row) {
            var rowDiv = $_element({
                $_tag: "div",
                class: "grid-row",
                $_on: {
                    "click": function(e) {
                        h.onClick(rowDiv);
                    }
                }
            });
            rowsDiv.insert(rowDiv);
        	rowDiv.bean = row;

            h.columns.forEach(function(column) {
                rowDiv.insert($_element({
                    $_tag: "td",
                    class: "grid-cell",
                    $_append: (function() {
                    	if (column.render) {
                    		return column.render(rowDiv);
                    	} else {
                        	return eval("rowDiv.bean." + column.property);
                    	}
                    })()
                }));
            });
        });
    },
    
    openDetails: function() {
        var h = this;

        h.root.find("grid-curtain").dom().style.width = "100%";
        h.root.find("grid-details-right").dom().style.width = h.detailsWidth;
    },
    
    closeDetails: function() {
        var h = this;

        h.root.find("grid-curtain").dom().style.width = "0px";
        h.root.find("grid-details-right").dom().style.width = "0px";
    }
});