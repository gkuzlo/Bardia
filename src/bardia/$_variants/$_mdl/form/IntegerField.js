
bardia.form.IntegerField = bardia.oop.Class.inherit(bardia.form.TextField, {

    initialize: function(config) {		        
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ...",
            required: false,
            serial: "S_" + (Math.random()*1000000).toFixed(0),
            readOnly: false
        }, config));

        this.render();
    },

	prepareMask: function() {
		var h = this;

		var mask = new InputMask(JST_MASK_NUMBERS, h.root.find(h.id(h.property)).dom());

		mask.updateFunction = function(_mask) {
			h.updateBeanProperty(_mask.control.value);
		}
	}
});