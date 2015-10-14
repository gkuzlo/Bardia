/**
 * 
 */
cesip.rest.REST = bardia.oop.Class.create({
	
	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
		}, config));
		
		this.url = "http://localhost:8080/csip";
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
	
	invokeGET: function(uri) {
		var h = this;
		var xhttp = new XMLHttpRequest();	
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if (h.onSuccess) {
					h.onSuccess(JSON.parse(xhttp.responseText));
				}
			}
		}
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
		}
		xhttp.open("POST", this.url + uri, true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		
		xhttp.send(JSON.stringify(jsonBody));		
	}

});