bardia.form.LookupField = bardia.oop.Class.create({

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ..."
        }, config));
        
        this.render();
    },
    
    render: function() {
        var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-row",
            $_append: [{
                $_tag: "input",
                class: "form-text-input",
                required: true,
                type: "text",
                id: h.property,
                $_on: {
                    change: function(e) {
                        h.updateBeanProperty(e.target.value);
                    }
                }
            }, {
                $_tag: "label",
                class: "form-text-input-label",
                for: h.property,
                $_append: "Data"
            }, {
                $_tag: "button",
                class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
                $_on: {
                    click: function(e) {
                        h.form.openDetails("300px");
                    }
                },
                $_append: [{
                    $_tag: "i",
                    class: "material-icons",
                    $_append: "keyboard_arrow_down",
                }]
            }]
        });
    },
    
    getElement: function() {
        var h = this;
        return h.root;
    },
    
    updateBeanProperty: function(value) {
        var h = this;
        var bean = h.form.getBean();
        
        eval("bean." + h.property + " = value");
    },
    
    updateInputValue: function(bean) {
        var h = this;
        h.root.find(h.property).dom().value = eval("bean." + h.property + " || ''");
    },
    
    setForm: function(form) {
        var h = this;
        h.form = form;
        h.form.addBeanChangedListener(function(bean) {
            h.updateInputValue(bean);
        });
    }
});