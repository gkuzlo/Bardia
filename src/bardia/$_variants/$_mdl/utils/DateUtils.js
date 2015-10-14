
bardia.utils.DateUtils = bardia.oop.Class.create({

    initialize: function(config) {

    },

    formatDateYYYYMMDD: function(date) {
    	var result = "";
    		result = date.getFullYear() + "-" + this.formatMM((date.getMonth() + 1)) + "-" + this.formatDD(date.getDate()); 
    	return result;
    },
    
    parseDate: function() {
    	
    },
    
    formatMM: function(month) {
    	if (month <= 9) {
    		return "0" + month;
    	} else {
    		return "" + month;
    	}
    },
    
    formatDD: function(day) {
    	if (day <= 9) {
    		return "0" + day;
    	} else {
    		return "" + day;
    	}
    },
    
    createFormatYYYYMMDD: function(time) {
    	return this.formatDateYYYYMMDD(new Date(time));
    }
});

bardia.utils.DateUtils.pattern = "";