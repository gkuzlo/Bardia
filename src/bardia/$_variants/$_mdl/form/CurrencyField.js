
bardia.form.CurrencyField = bardia.oop.Class.inherit(bardia.form.TextField, {

	prepareMask: function() {
		var h = this;

		var parser = new NumberParser();
		parser.decimalDigits = 2;
		parser.decimalSeparator = ".";
		//parser.currencySymbol = h.currencySymbol || "PLN";
		parser.useCurrency = false;

		var mask = new NumberMask(parser, h.root.find(h.id(h.property)).dom());
		mask.allowNegative = true;

		mask.updateFunction = function(_mask) {
			h.updateBeanProperty(_mask.control.value);
		}
	}
});