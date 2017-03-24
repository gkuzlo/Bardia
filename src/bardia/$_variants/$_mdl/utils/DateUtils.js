
bardia.utils.DateUtils = bardia.oop.Class.create({

    initialize: function(config) {

    },

    formatDateYYYYMMDD: function(date) {
    	var result = "";
    	try {
    		result = date.getFullYear() + "-" + this.formatMM((date.getMonth() + 1)) + "-" + this.formatDD(date.getDate());
    	} catch (e) {
    		result = "";
    	}
    	return result;
    },
    
    formatDateHHmm: function(date) {
    	var result = "";
    	try {
    		result = this.formatMM((date.getHours())) + ":" + this.formatMM(date.getMinutes());
    	} catch (e) {
    		alert(e);
    		result = "";
    	}
    	return result;
    },
    
    /**
      var du = new bardia.utils.DateUtils();
      return du.formatDateHHmm() + " " + du.formatDateYYYYMMDDHHmm() 
     */
    formatDateYYYYMMDDHHmm: function(date) {
    	var result = "";
    	try {
    		result = date.getFullYear() + "-" + this.formatMM((date.getMonth() + 1)) + "-" + this.formatDD(date.getDate() + " " + this.formatHH(date.getHours())) + ":" + this.formatMM(date.getMinutes());
    	} catch (e) {
    		result = "";
    	}
    	return result;
    },
    
    formatDateHHmmSS: function(date) {
    	var result = "";
    	try {
    		result = this.formatMM(date.getHours()) + ":" + this.formatMM(date.getMinutes()) + ":" + this.formatMM(date.getSeconds());
    	} catch (e) {
    		alert(e);
    		result = "";
    	}
    	return result;
    },
    
    daySecondsToHHMM: function(daySeconds) {
    	var result = "";
    	
    		if (daySeconds) {
	    		var hours = (daySeconds - (daySeconds % 3600)) / 3600;
	    		
	    		var restSeconds = (daySeconds - hours * 3600);
	    		var minutes = (restSeconds - (restSeconds % 60)) / 60;
	    		
	    		result = this.formatHH(hours) + ":" + this.formatMM(minutes);
    		}
    		
    	return result;
    },
    
    parseDate: function(dateStr) {
        if (!dateStr) {
            return "";
        }

        var parser = new DateParser(bardia.utils.DATE_FORMAT);
            result = parser.parse(dateStr);

        return result;
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
    
    formatHH: function(hour) {
    	if (hour <= 9) {
    		return "0" + hour;
    	} else {
    		return "" + hour;
    	}
    },
    
    /**
     * bardia.utils.DateUtils
     * createFormatYYYYMMDD
     */
    createFormatYYYYMMDD: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateYYYYMMDD(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },

    createFormatHHmm: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateHHmm(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },
    
    createFormatHHmmSS: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateHHmmSS(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;
    },
    /**
     * new bardia.utils.DateUtils().createFormatDateYYYYMMDDHHmm()
     */
    createFormatDateYYYYMMDDHHmm: function(time) {
    	var result = "";
    	try {
    		if (time)
    			result = this.formatDateYYYYMMDDHHmm(new Date(time));	
    	} catch (e) {
    		alert(e);
    	}
    	return result;    	
    },

    getLeftMinutesTo: function(dateMillis, nowMillis) {
    	var diff = dateMillis - nowMillis;
    	var diffSec = diff / 1000;
    	var diffMins = diffSec / 60;

    	return diffMins.toFixed(0);
    },
    
    convertIntToTime: function(intValue) {
 	   var result = "00:00";
 	       try {
 	    	   result = this.formatNumber(((intValue - intValue % 60) / 60), 2) + ":" + this.formatNumber((intValue % 60), 2)
 	       } catch (e) {
 	    	   console.log("ERROR: convertIntToTime");
 	       }
 	   return result;
    },
    
    convertDaySecondsToTime: function(daySeconds) {
  	   var result = "00:00:00";
  	       try {
  	    	   var hours = (daySeconds - (daySeconds % 3600)) / 3600;
  	    	   var minutes = ((daySeconds - (hours * 3600)) / 60).toFixed(0);
  	    	   var seconds = daySeconds % 60;
  	    	   
  	    	   result = this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2) + ":" + this.formatNumber(seconds, 2)
  	       } catch (e) {
  	    	   console.log("ERROR: convertDaySecondsToTime");
  	       }
  	   return result;
     },
    
    formatNumber: function(num, len) {
        var result = null;
        try {
            result = "" + parseInt(num);
            while (result.length < len) {
                result = "0" + result;
            }
        } catch (e) {
            alert("bardia.utils.DateUtils.formatNumber" + e);
        }

        if (isNaN(parseInt(num))) {
            result = "";
        }

        return result;
    },

    formatTimeSecNoZerosSec: function(date) {	
    	if (!date) {
    		return "";
    	}
    	var result = this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
		if (date.getSeconds() > 0) {
			result += ":" + this.formatNumber(date.getSeconds(), 2);
		}
		return result;
    },

    formatSeconds: function(daySeconds) {
    	var result = "";
    	return result;
    },

    EOW: function () {
    	return this.parseDate("4712-12-31T00:00:00.000+0000");
    },

    BOW: function () {
    	return new Date(0);
    },
    
    stripTime: function(d) {
    	var result = new Date(d.getTime());
    	result.setHours(0);
    	result.setMinutes(0);
    	result.setSeconds(0);
    	result.setMilliseconds(0);
    	return result;
    }
});

bardia.utils.DateUtils.pattern = "";
bardia.utils.DATE_FORMAT = "yyyy-MM-ddTHH:mm:ss.SSS+SSSS";