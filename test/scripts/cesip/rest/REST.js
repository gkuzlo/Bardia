/**
 * 
 */
cesip.rest.REST = bardia.oop.Class.create({
	
	initialize: function() {
		this.url = "http://localhost:8080/csip";
	},
	
	getSchedulesImports: function() {
		this.invokeGET("/getSchedulesImports.json");
	},
	
	invokeGET: function(uri) {
		var xhttp = new XMLHttpRequest();	
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				alert(xhttp.responseText);
			}
		}
		xhttp.open("GET", this.url + uri, true);
		xhttp.send();
	}

});