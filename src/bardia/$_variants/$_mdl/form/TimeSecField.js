bardia.form.TimeSecField = bardia.oop.Class.inherit(bardia.form.TextField, {

	prepareMask: function() {
		var h = this;

		var mask = new InputMask("##:##", h.root.find(h.id(h.property)).dom());

		mask.updateFunction = function(_mask) {
			h.updateBeanProperty(_mask.control.value);
		}
	},
	
    updateBeanProperty: function(v) {
        var h = this;        
        
        var value = v.split(":");

        var sec1 = parseInt(value[0]) * 60;
        var sec2 = parseInt(value[1]);
        
        if (isNaN(sec1)) {
        	sec1 = 0;
        }
        
        if (isNaN(sec2)) {
        	sec2 = 0;
        }

        var sec = sec1 + sec2;

        eval("h.form.getBean()." + h.property + " = sec;");

		if (h.onChange) {
			h.onChange(value);
		}
    },

    updateInputValue: function() {
        var h = this;

        var v = eval("h.form.getBean()." + h.property + " || 0");

        v = parseInt(v);
        
        var hours = ((v - (v%60)) / 60);
        var minutes = (v % 60);
        
        if (hours < 10) {
        	hours = "0" + hours;
        }

        if (minutes < 10) {
        	minutes = "0" + minutes;
        }
        
        console.log("updateInputValue() ->" + hours + ":" + minutes);

        h.root.find(h.id(h.property)).dom().value = hours + ":" + minutes;
    },
});