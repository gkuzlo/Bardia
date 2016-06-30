
bardia.form.IntegerField = bardia.oop.Class.inherit(bardia.form.TextField, {

	prepareMask: function() {
		var h = this;

		var mask = new InputMask(JST_MASK_NUMBERS, h.root.find(h.id(h.property)).dom());

		mask.updateFunction = function(_mask) {
			h.updateBeanProperty(_mask.control.value);
		}
	}
});