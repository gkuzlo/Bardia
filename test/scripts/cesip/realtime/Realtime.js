cesip.realtime.Realtime = bardia.oop.Class.create({

	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
			tabs: []
		}, config));
		
		this.render();
	},
	
	render: function() {
		var h = this;

		h.tabs = new bardia.layout.Tabs({
			inside: h.inside,
			tabs: [{
				name: "Pojazdy"
			}, {
				name: "Wirtualny monitor"
			}]
		});
	}
});