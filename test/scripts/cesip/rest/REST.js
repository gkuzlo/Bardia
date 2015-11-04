/**
 * 
 */
cesip.rest.REST = bardia.oop.Class.create({

	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
		}, config));

		this.url = "http://localhost:8080/csip";
	},

    importData: function(dataImport) {
    	this.invokePOST("/importData.json", {}, dataImport);
    },

	getSchedulesImports: function() {
		this.invokeGET("/getDayTypes.json");
	},

    getStraps: function() {
    	this.invokeGET("/getStraps.json", {}, {});
    },
    
    getSchedulesForStrap: function(strap) {
    	this.invokePOST("/getSchedulesForStrap.json", {}, strap);
    },
    
    getTasksForSchedule: function(schedule) {
    	this.invokePOST("/getTasksForSchedule.json", {}, schedule);
    },
    
	getCoursesForTask: function(task) {
    	this.invokePOST("/getCoursesForTask.json", {}, task);
    },

	getStoppingsForCourse: function(course) {
    	this.invokePOST("/getStoppingsForCourse.json", {}, course);
    },
    
    getVariantDetails: function(variant) {
    	this.invokePOST("/getVariantDetails.json", {}, variant);
    },
    
	getConnection: function(request) {
    	this.invokePOST("/getConnection.json", {}, request);
    },

	getConnections: function() {
    	this.invokeGET("/getConnections.json", {});
    },

	getConnectionDetails: function(connection) {
    	this.invokePOST("/getConnectionDetails.json", {}, connection);
    },

	saveConnection: function(connection) {
    	this.invokePOST("/saveConnection.json", {}, connection);
    },

	findRoute: function(nodesList) {
    	this.invokePOST("/findRoute.json", {}, nodesList);
    },

	importOSM: function(importBean) {
    	this.invokePOST("/importOSM.json", {}, importBean);
    },

    getOSMImports: function() {
    	this.invokePOST("/osmImports.json", {}, {});
    },
    
	getDayTypes: function() {
    	this.invokeGET("/getDayTypes.json", {});
    },

	saveDayType: function(dayType) {
    	this.invokePOST("/saveDayType.json", {}, dayType);
    },

	getCalendar: function() {
    	this.invokePOST("/getCalendar.json", {}, {});
    },

	saveDay: function(day) {
    	this.invokePOST("/saveDay.json", {}, day);
    },
    
    getStopPoints: function() {
    	this.invokePOST("/getStopPoints.json", {}, {});
    },

    saveStopPoint: function(stopPoint) {
    	this.invokePOST("/saveStopPoint.json", {}, stopPoint);
    },

	invokeGET: function(uri) {
		var h = this;
		var xhttp = new XMLHttpRequest();	
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if (h.onSuccess) {
					h.onSuccess(JSON.parse(xhttp.responseText));
				}
			}
		};
		xhttp.open("GET", this.url + uri, true);
		xhttp.send();
	},
	
	invokePOST: function(uri, paramsForURL, jsonBody) {
		var h = this;
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if (h.onSuccess) {
					h.onSuccess(JSON.parse(xhttp.responseText));
				}
			}
		};
		xhttp.open("POST", this.url + uri, true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		
		xhttp.send(JSON.stringify(jsonBody));		
	}

});