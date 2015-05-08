/**
*
*/
UI.DateUtils = Class.create({
   /**
    *  
    */
   initialize: function() {
       this.months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
   },
   formatDate: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               result = this.formatNumber(date.getDate(), 2) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getFullYear(), 4);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatDateYYYYMMDD: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               var parser = new DateParser(UI.DATE_YYYMMMDDD_FORMAT);
                   result = parser.format(date); 
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatFullDate: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               var parser = new DateParser(UI.DATE_FORMAT);
                   result = parser.format(date); 
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatDateTime: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               result = this.formatNumber(date.getFullYear(), 4) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2) + ":" + this.formatNumber(date.getSeconds(), 2);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatDateTimeNoSec: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               result = this.formatNumber(date.getFullYear(), 4) + "-" + this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   /**
    *
    */
   formatDateMonthDayTimeNoSec: function(date) {
       var result = "";
           if (!date) {
               return result;
           }
           try {
               result = this.formatNumber((date.getMonth() + 1), 2) + "-" + this.formatNumber(date.getDate(), 2) + " " + this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
           } catch (e) {
               new UI.AlertDialog({message: e});
           }
       return result;
   },
   formatTime: function(date) {
       var result = "";
           try {
               result = this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2);
           } catch (e) {
               result = ""; 
           }
       return result;
   },
   formatTimeSec: function(date) {
       return this.formatNumber(date.getHours(), 2) + ":" + this.formatNumber(date.getMinutes(), 2) + ":" + this.formatNumber(date.getSeconds(), 2);
   },  
   formatNumberToTime: function(num) {
       var hours = (num - (num % 60)) / 60;
       var minutes = num % 60;

       return this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2);
   },
   formatNumber: function(num, len) {
       var result = null;
       try {
           result = "" + parseInt(num);
           while (result.length < len) {
               result = "0" + result;
           }
       } catch (e) {
           new UI.AlertDialog({message: e});
       }
       
       if (isNaN(parseInt(num))) {
           result = "";
       }
       
       return result;
   },
   parseNumber: function(number) {
   },
   parseDate: function(dateStr) {

       if (!dateStr) {
           return "";
       }

       var parser = new DateParser(UI.DATE_FORMAT);
           result = parser.parse(dateStr);

       return result;
   },
   getMonthName: function(zeroBasedNo) {
       return this.months[zeroBasedNo];
   },
   rollDays: function(pDate, pDays) {
       var result = pDate;
           result.setDate(result.getDate() + pDays);
       return result;
   },
   rollHours: function(pDate, pHours) {
       var result = new Date();
           result.setTime(pDate.getTime() + (pHours * 60 * 60 *1000));
       return result;
   },
   dayDiff: function(startDate, endDate) {
       var result = 0;
           var sDate = new Date();
               sDate.setFullYear(startDate.getFullYear());
               sDate.setMonth(startDate.getMonth());
               sDate.setDate(startDate.getDate());
               sDate.setHours(0);
               sDate.setMinutes(0);
               sDate.setSeconds(0);
               sDate.setMilliseconds(0);
               
           var eDate = new Date();
               eDate.setFullYear(endDate.getFullYear());
               eDate.setMonth(endDate.getMonth());
               eDate.setDate(endDate.getDate());
               eDate.setHours(0);
               eDate.setMinutes(0);
               eDate.setSeconds(0);
               eDate.setMilliseconds(0);
               
           result = (eDate.getTime() - sDate.getTime()) / 1000 / 60 / 60 / 24;
    
       return result;
   },
   hoursDiff: function(startDate, endDate) {
       var result = 0;
           var sDate = new Date();
               sDate.setFullYear(startDate.getFullYear());
               sDate.setMonth(startDate.getMonth());
               sDate.setDate(startDate.getDate());
               sDate.setHours(startDate.getHours());
               sDate.setMinutes(0);
               sDate.setSeconds(0);
               sDate.setMilliseconds(0);
               
           var eDate = new Date();
               eDate.setFullYear(endDate.getFullYear());
               eDate.setMonth(endDate.getMonth());
               eDate.setDate(endDate.getDate());
               eDate.setHours(endDate.getHours());
               eDate.setMinutes(0);
               eDate.setSeconds(0);
               eDate.setMilliseconds(0);
               
           result = (eDate.getTime() - sDate.getTime()) / 1000 / 60 / 60;

       return result;
   },
   yearDiff18: function(birthDate, currDate) {
       
       var result = false;
       
           var currDate = new Date (currDate);
           var birthDate = new Date (birthDate);
           
           var currYear = new Date(currDate);
           var currMonth = new Date(currDate);
           var currDay = new Date(currDate);
           
           var birthYear = new Date(birthDate);
           var birthMonth = new Date(birthDate);
           var birthDay = new Date(birthDate);
           
           currYear = currYear.getFullYear();
           currMonth = currMonth.getMonth() + 1;
           currDay = currDay.getDate();
           
           birthYear = birthYear.getFullYear(birthDate);
           birthMonth = birthMonth.getMonth(birthDate) + 1;
           birthDay = birthDay.getDate(birthDate);
           
           if ( (currYear - birthYear > 18)   || ((currYear - birthYear >= 18) && (currMonth - birthMonth >= 0) && (currDay - birthDay >= 0))) {
               result = true;
           } else {
               result = false;
           }
       return result;
   },
   roundToDay: function(date) {
       if(date === undefined || date ==""){
           date = new Date();
       }
       var eDate = new Date();
           eDate.setFullYear(date.getFullYear());
           eDate.setMonth(date.getMonth());
           eDate.setDate(date.getDate());
           eDate.setHours(0);
           eDate.setMinutes(0);
           eDate.setSeconds(0);
           eDate.setMilliseconds(0);
           
       return eDate;
   },
   getNowMinutes: function() {
       var result = 0;
           var d = new Date();
           result = (d.getHours() * 60) + d.getMinutes();
       return result;
   },
   /**
    * na wejsciu czas w formacie HH:MM
    * na wyjściu liczba HH * 60 + MM
    */
   convertTimeToInt: function(time) {
	   var result = 0;
	       try {
	    	   var sub = time.split(":");
	    	   result = parseInt(sub[0]) * 60 + parseInt(sub[1]);
	       } catch (e) {
	           result = 0; 
	       }
	   return result;
   },
   /**
    * 
    */
   convertIntToTime: function(intValue) {
	   var result = "00:00";
	       try {
	    	   this.formatNumber(((intValue - intValue % 60) / 60), 2) + ":" + this.formatNumber((intValue % 60), 2)
	       } catch (e) {
	    	   
	       }
	   return result;
   }
});