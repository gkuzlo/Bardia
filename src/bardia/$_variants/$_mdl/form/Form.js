/**
 *
 */
bardia.form.Form = bardia.oop.Class.create({

    detailsWidth: "400px",

    initialize: function(config) {
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            title: "Insert title here ..."
        }, config));

        this.render();
    },

    render: function() {
        var h = this;

        h.inside.update();

        h.panel = new bardia.layout.Panel({
            inside: h.inside,
            title: h.title
        });

        h.prepareRoot();
    },

    prepareRoot: function() {
        var h = this;

        h.root = $_element({
            $_tag: "div",
            class: "form-content",
        });

        h.fields.forEach(function(field) {
            var _field = bardia.oop.Class.extend({
                type: "Text"
            }, field);

            var formField = eval("new bardia.form." + _field.type + "Field(_field)");

            formField.setForm(h);
            
            h.root.insert(formField.getElement());
        });

        var curtain = $_element({
            $_tag: "div",
            class: "form-curtain",
            id: "form-curtain",
            style: "left:-" + h.inside.dom().getBoundingClientRect().width + "px",
            $_on: {
                "click": function() {
                    h.closeDetails();
                }
            },
            $_append: [{
                $_tag: "div",
                class: "form-details-right",
                id: "form-details-right",
                $_on: {
                    "click": function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                },
            }]
        });

        h.root.insert(curtain);
        $_upgradeElement(h.root);

        h.panel.getContent().insert(h.root);
    },

    addBeanChangedListener: function(listener) {
        var h = this;
        h.beanListeners = h.beanListeners || [];
        h.beanListeners.push(listener);
    },

    setBean: function(bean) {
        this.bean = bean;

        (this.beanListeners || []).forEach(function(listener) {
            listener(bean);
        });
    },

    getBean: function() {
    	this.bean = this.bean || {};
        return this.bean || {};
    },

    openDetails: function(width) {
        var h = this;

        h.root.find("form-curtain").dom().style.left = "0px";
        h.root.find("form-details-right").dom().style.width = width || h.detailsWidth;

        var result = h.root.find("form-details-right");
        result.update();

        return result
    },

    closeDetails: function() {
        var h = this;

        h.root.find("form-curtain").dom().style.left = "-" + h.inside.dom().getBoundingClientRect().width + "px";
        //h.root.find("form-details-right").dom().style.width = "0px";
    }
});