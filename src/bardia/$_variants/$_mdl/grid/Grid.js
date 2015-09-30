/**
 *
 */
bardia.grid.Grid = bardia.oop.Class.create({
    detailsWidth: "400px",
    /**
     *
     */
    initialize: function(config) {
        bardia.oop.Class.extend(this, config || {});
        
        this.render();
    },
    /**
     *
     */
    render: function() {
        var h = this;
        
        h.inside.update();

        h.root = $_element({
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
        });

        h.inside.insert(h.root);

        $_upgradeElement(h.root);
    },

    fetch(model) {
        var h = this;
        
        var rowsDiv = h.root.find("grid-rows");
        rowsDiv.update();

        (model.rows || []).forEach(function(row) {
            var rowDiv = $_element({
                $_tag: "div",
                class: "grid-row",
                $_on: {
                    "click": function(e) {
                        h.openDetails();
                    }
                }
            });
            rowsDiv.insert(rowDiv);
            
            $_upgradeElement(rowDiv);

            h.columns.forEach(function(column) {
                rowDiv.insert($_element({
                    $_tag: "td",
                    class: "grid-cell",
                    $_append: row[column.property]
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