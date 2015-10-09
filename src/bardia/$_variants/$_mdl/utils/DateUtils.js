
bardia.utils.DateUtils = bardia.oop.Class.create({

    initialize: function(config) {

    },

    formatDateYYYYMMDD: function(date) {
    	var result = "";
    		result = date.getYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(); 
    	return result;
    },
    
    parseDate: function() {
    	
    }
});

bardia.utils.DateUtils.pattern = "";