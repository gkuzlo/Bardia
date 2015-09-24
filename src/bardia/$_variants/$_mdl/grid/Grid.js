/**
 *
 */
bardia.grid.Grid = bardia.oop.Class.create({
    /**
     *
     */
    initialize: function(config) {        
        bardia.oop.Class.inherit(config, this);
        
        this.render();
    },
    /**
     *
     */
    render: function() {
        var h = this;
        
        h.inside.update();

        h.root = $_element({
            $_tag: "table",
            class: "mdl-data-table mdl-js-data-table mdl-shadow--2dp",
            $_append: [{
                $_tag: "thead",
                id: "THHEAD",
                $_append: (h.columns || []).map(function(column) {
                    return {
                        $_tag: "th",
                        class: "mdl-data-table__cell--non-numeric",
                        $_append: column.name
                    }
                })
            }, {
                $_tag: "tbody",
                id: "TBODY",
                $_append: [{
                    $_tag: "tr",
                    $_append: [{
                        $_tag: "td",
                        class: "mdl-data-table__cell--non-numeric",
                        $_append: "Grzegorz"
                    }, {
                        $_tag: "td",
                        $_append: [{
                            $_tag: "INPUT",
                            type: "number"
                        }]
                    }, {
                        $_tag: "td",
                        $_append: "Julia"
                    }]
                }, {
                    $_tag: "tr",
                    $_append: [{
                        $_tag: "td",
                        class: "mdl-data-table__cell--non-numeric",
                        $_append: "Agnieszka"
                    }, {
                        $_tag: "td",
                        $_append: "BBB"
                    }, {
                        $_tag: "td",
                        $_append: "CCC"
                    }]
                }]
            }]
        });
        
        h.inside.insert(h.root);
        
        $_upgradeElement(h.root);
    },
    
    fetch(model) {
        var h = this;
    }
});