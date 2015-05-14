/**
 * @class UI.DatePicker
 */
UI.DatePicker = Class.create({
	initialize: function(config) {
		this.config = config;
		
		if (!this.config.date) {
			this.config.date = new Date();
		}
		
		this.config.date = new UI.DateUtils().roundToDay(this.config.date);

		this.display();
	},
	display: function() {
		var handler = this;

		if (this.config) {
			/*
			 * miesiac
			 */
			this.monthDescription = new Element("DIV", {
				class: "calendar_day",
				style: "text-align:center; width:90px; top:10px; left:35px; overflow:hidden"
			});
			this.config.inside.insert(this.monthDescription);
			this.monthDescription.observe("click", function(e) {
				e.cancelBubble = true;
				handler.showMonths();
			});
	
			/*
			 * rok
			 */
			this.yearDescription = new Element("DIV", {
				class: "calendar_day",
				style: "text-align:center; width:37px; top:10px; right:0px; overflow:hidden; padding:0px"
			});
			this.config.inside.insert(this.yearDescription);
			
			this.yearDescription.observe("click", function(e) {
				e.cancelBubble = true;
				handler.showYears();
			});
			
			/*
			 * dzien
			 */
			this.dateDescription = new Element("DIV", {
				class: "calendar_day",
				style: "text-align:center; width:17px; top:10px; left:11px; overflow:hidden; padding:0px"
			});
			this.config.inside.insert(this.dateDescription);

			this.dateDescription.observe("click", function(e) {
				e.cancelBubble = true;
			});
						 
			/*
			 * DNI
			 */
			this.days = new Element("DIV", {
				style: "position:absolute; top:30px; left:5px; width:175px; height:150px; border:1px solid transparent"
			});
			this.config.inside.insert(this.days);
			
			this.updateDateInfo();
		}
	},
	updateDateInfo: function() {
		var handler = this;
		
		var configDate = new Date();
		if(this.config.date !== undefined) {
			configDate = this.config.date;
		}
		
		var DU = new UI.DateUtils();
	
		this.dateDescription.update(configDate.getDate());
		this.monthDescription.update(DU.getMonthName(configDate.getMonth()));		
		this.yearDescription.update(configDate.getFullYear());
		
			this.days.update("");
		
			var currentMonth = configDate.getMonth();

			var d = DU.roundToDay(new Date());

				d.setTime(configDate.getTime());
				d.setDate(1);
				d.setMonth(configDate.getMonth());
				
				var dayOfWeek = d.getDay();

				d = DU.rollDays(d, -dayOfWeek);
				
				// stage: 0 - before, 1 - current month, 2 - after current month
				var stage = 0;
				
				if (currentMonth == d.getMonth()) {
					stage = 1;
				}
				
				var top = 5;
				var left = 5;

				while(stage <= 2) {
					var color = "#222222";
					
					if (d.getDay() == 0) {
						color = "red";
					}
					
					if (d.getDay() == 6) {
						color = "#9393b1";
					}
				
					var day = new Element("DIV", {
						class: "calendar_day",
						style: "width:14px; color:" + color + "; top:" + top + "px; left:" + left + "px;"
					});
					
					day.date = new Date();
						day.date.setTime(d.getTime());

					day.update(d.getDate());
					
					day.title = "" + d;
					
					if (d.getDate() == configDate.getDate() && d.getMonth() == configDate.getMonth() && d.getFullYear() == configDate.getFullYear()) {
						day.setStyle({
							border: "1px solid #99bbe8",
							backgroundColor: "white",
							color: "black"
						});
					}
					
					var nd = new Date();
					if (d.getDate() == nd.getDate() && d.getMonth() == nd.getMonth() && d.getFullYear() == nd.getFullYear()) {
						day.setStyle({
							border: "1px solid #99bbe8",
							backgroundColor: "#d2e1f4",
							color: "black"
						});
					}

					day.observe("click", function(event) {
						if (handler.config.dateSelected) {
							handler.config.dateSelected(event.element().date);
						}
					});

					this.days.insert(day);

					if (stage == 0) {
						if (currentMonth == d.getMonth()) {
							stage = 1;
						}
					} else if (stage == 1) {
						if (currentMonth != d.getMonth()) {
							stage = 2;
						}
					}

					d = DU.rollDays(d, 1);
					
					if (d.getDay() == 0) {
						left = 5;
						top += 20;
					} else {
						left += 24;
					}
					
					if (stage == 2 && d.getDay() == 0) {
						stage = 3;
					}
				}
	},
	showMonths: function() {
		var handler = this;
		
		var monthsCanvas = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:white"
		});
		
		monthsCanvas.observe("click", function(e) {
			e.cancelBubble = true;
		});
		
		handler.config.inside.insert(monthsCanvas);
		
		var DU = new UI.DateUtils();

		var top = 20;
		var left = 10;

		var i=0;
		for (i=0; i<DU.months.length; i++) {
		
			top = 20 + (i % 6) * 20;
			left = 10 + ((i - (i%6)) / 6) * 80;
		
			var color = "";
			if (i == handler.config.date.getMonth()) {
				color = "color:#99bbe8";
			}
		
			var m = new Element("DIV", {
				style: "position:absolute; text-align:center; width:80px; height:14px; top:" + top + "px; left:" + left + "px;" + color,
				class: "calendar_day"
			});
			m.month = i;
			m.update(DU.months[i]);
			
			m.observe("click", function(e) {
				handler.config.date.setDate(1);
				handler.config.date.setMonth(e.target.month);
				handler.updateDateInfo();
				monthsCanvas.remove();
			});
			
			monthsCanvas.insert(m);
		}
	},
	showYears: function() {
		var handler = this;
		
		var yearsCanvas = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; bottom:0px; right:0px; background-color:white"
		});
		
		yearsCanvas.observe("click", function(e) {
			e.cancelBubble = true;
		});
		
		handler.config.inside.insert(yearsCanvas);
		
		var DU = new UI.DateUtils();

		var top = 20;
		var left = 10;

		var startYear = handler.config.date.getFullYear() - 5;

		var i=0;
		for (i=0; i<DU.months.length; i++) {
		
			top = 20 + (i % 6) * 20;
			left = 10 + ((i - (i%6)) / 6) * 80;
		
			var color = "";
			if ((startYear + i) == handler.config.date.getFullYear()) {
				color = "color:#99bbe8";
			}
		
			var m = new Element("DIV", {
				style: "position:absolute; text-align:center; width:80px; height:14px; top:" + top + "px; left:" + left + "px;" + color,
				class: "calendar_day"
			});
			m.year = (startYear + i);
			m.update((startYear + i));
			
			m.observe("click", function(e) {
				handler.config.date.setFullYear(e.target.year);
				handler.updateDateInfo();
				yearsCanvas.remove();
			});
			
			yearsCanvas.insert(m);
		}
	}
});