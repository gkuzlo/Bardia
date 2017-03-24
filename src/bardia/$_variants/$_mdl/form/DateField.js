
bardia.form.DateField = bardia.oop.Class.inherit(bardia.form.ActionField, {
    
    initialize: function(config) {

        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Insert title here ...",
            serial: "S_" + (Math.random()*1000000).toFixed(0),
            readOnly: false,
            visible: true,
            required: false,
            date: new Date(),
            du: new bardia.utils.DateUtils()
        }, config));

        this.render();
    },

    displayButton: function() {
    	var h = this;

    	return $_element({
    		$_tag: "div",
    		style: "position:absolute; bottom:0px; left:170px; display:" + ((h.readOnly==true)?"none":"flex") + "; flex-direction:row",
    		$_append: [{
                $_tag: "button",
                class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
                $_on: {
                    click: function(e) {
                        var element = h.form.openDetails("295px");
                        try {
                        	h.displayCalendar(element);
                        } catch (e) {
                        	alert(e);
                        }
                    }
                },
                $_append: [{
                    $_tag: "i",
                    class: "material-icons action-icon",
                    $_append: "today",
                }]
            }, {
                $_tag: "button",
                class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
                $_on: {
                    click: function(e) {
                    	h.updateBeanProperty(undefined);
                    	h.updateInputValue(h.form.getBean());
                    }
                },
                $_append: [{
                    $_tag: "i",
                    class: "material-icons action-delete-icon",
                    $_append: "cancel",
                }]
            }]
    	});
    },

    displayCalendar: function(html) {    	
    	var h = this;

    	h.calendarRoot = $_element({
    		$_tag: "div",
    		class: "calendar-container",
    		$_append: [{
    			$_tag: "div",
    			class: "calendar-weekday",
    			id: "weekday"
    		}, {
    			$_tag: "div",
    			class: "calendar-month",
    			id: "month"
    		}, {
    			$_tag: "div",
    			class: "calendar-month-day",
    			id: "month-day"
    		}, {
    			$_tag: "div",
    			class: "calendar-year",
    			id: "year"
    		}, {
    			$_tag: "div",
    			class: "calendar-navigation",
    			id: "month-navigation",
    			$_append: [{
    	            $_tag: "div",
    	            class: "material-icons mdl-button mdl-js-button mdl-button--icon calendar-nav-icon",
    	            $_append: "keyboard_arrow_left",
    	            style: "top:5px; left:5px;",
    	            $_on: {
    	                click: function(e) {
    	                	h.minusMonth();
    	                }
    	            },
    	        }, {
    	        	$_tag: "div",
    	        	id: "month-full-name",
    	        	style: "position:absolute; top:0px; left:30px; right:30px; height:40px; text-align:center;"
    	        }, { 
    	            $_tag: "div",
    	            class: "material-icons mdl-button mdl-js-button mdl-button--icon calendar-nav-icon",
    	            $_append: "keyboard_arrow_right",
    	            style: "top:5px; right:5px;",
    	            $_on: {
    	                click: function(e) {
    	                	h.plusMonth();
    	                }
    	            },
    	        }]
    		}, {
    			$_tag: "div",
    			class: "calendar-days",
    			id: "month-days",
    		}, {
    			$_tag: "div",
    			class: "calendar-buttons",
    			id: "month-buttons"
    		}, { 
	            $_tag: "div",
	            class: "material-icons mdl-button mdl-js-button mdl-button--icon calendar-nav-icon",
	            $_append: "cancel",
	            style: "top:5px; right:5px; color:white;",
	            title: "Cancel",
	            $_on: {
	                click: function(e) {
	                	h.form.closeDetails();
	                }
	            },
	        }],
    	});

    	html.insert(h.calendarRoot);
    	    	
    	h.updateDaysView();
    },
    
    plusMonth: function() {
    	var h = this;
    	h.date.setMonth(h.date.getMonth() + 1);
    	h.updateDaysView();
    },
    
    minusMonth: function() {
    	var h = this;
    	h.date.setMonth(h.date.getMonth() - 1);
    	h.updateDaysView();
    },
    
    updateDaysView: function() {
    	var h = this;
    	
    	h.date = h.date || eval("h.form.getBean()." + h.property) || h.du.stripTime(new Date());    	
    	
    	h.calendarRoot.find("month-days").update();
    	var days = h.prepareDaysRows();
    	days.forEach(function(_day) {
    		h.calendarRoot.find("month-days").insert($_element(_day));
    	});

    	h.setWeekday();
    	h.setMonth();
    	h.setMonthFullName();
    	h.setMonthDay();
    	h.setYear();
    },

    prepareDaysRows: function() {
    	var h = this;
    	
    	var result = [];

    	var clonedDate = new Date(h.date.getTime());
    	clonedDate.setDate(1);
    	clonedDate.setHours(0);
    	clonedDate.setMinutes(0);
    	clonedDate.setSeconds(0);
    	clonedDate.setMilliseconds(0);

    	var currentMonth = clonedDate.getMonth();

    	clonedDate.setTime(clonedDate.getTime() - (clonedDate.getDay()*24*60*60*1000));

    	var i = 0;
    	for (i=0; i<=41; i++) {
    		var aDate = new Date(clonedDate.getTime() + (i * 24 * 60 * 60 * 1000));
    		
    		var clazz = "calendar-not-today";
    		if (aDate.getMonth() == currentMonth) {
    			color = "black";

    			if (aDate.getDay() == 0) {
    				color = "red";
    			}

    			if (aDate.getDate() == h.date.getDate()) {
    				clazz = "calendar-today";
    			}
    		}

    		result.push({
    			$_tag: "div",
    			class: "calendar-single-day mdl-js-ripple-effect " + clazz,
    			$_props: {
    				date: aDate
    			},
    			$_on: {
    				click: function(e) {
    					h.updateBeanProperty(e.target.date.getTime());
    					h.updateInputValue(h.form.getBean());
    					h.form.closeDetails();
    				}
    			},
    			$_append: "" + aDate.getDate()
    		});
    	}

    	return result;
    },

    updateInputValue: function(bean) {
        var h = this;
        var date = new Date(eval("bean." + h.property));
        if (date) {
        	h.root.find(h.id(h.property)).dom().value = h.du.createFormatYYYYMMDD(date.getTime());
        }
    },

    setWeekday: function() {
    	this.calendarRoot.find("weekday").update(bardia.form.DateField.WEEKDAYS[this.date.getDay()]);
    },
    
    setMonth: function() {
    	this.calendarRoot.find("month").update(bardia.form.DateField.SHORT_MONTHS[this.date.getMonth()]);
    },
    
    setMonthFullName: function() {
    	this.calendarRoot.find("month-full-name").update(bardia.form.DateField.MONTHS[this.date.getMonth()]);
    },
    
    setMonthDay: function() {
    	this.calendarRoot.find("month-day").update("" + this.date.getDate());
    },

    setYear: function() {
    	this.calendarRoot.find("year").update("" + this.date.getFullYear());
    },
});

bardia.form.DateField.WEEKDAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
bardia.form.DateField.MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
bardia.form.DateField.SHORT_MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
bardia.form.DateField.DU = new bardia.utils.DateUtils();
