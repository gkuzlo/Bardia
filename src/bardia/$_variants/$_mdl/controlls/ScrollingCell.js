
bardia.controlls.ScrollingCell = bardia.oop.Class.create({

	initialize : function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
			value: "title"
		}, config));
		
		this.render();
	},

	render: function() {
		var h = this;

		h.root = $_element({
			$_tag: "span",
			class: "controlls-scrolling-element",
			style: "top:0px; overflow:visible; width:unset; right:unset;",
			$_append: h.value,
			title: h.value,
			$_on: {
				mouseover: function(e) {
					h.startScrolling();
				},
				mouseout: function(e) {
					h.stopScrolling();
				}
			}
		});
		
		h.autoscroll();
	},
	
	autoscroll: function() {
		var h = this;
		
		h.interval = setInterval(function() {
			h.startScrolling();
			
			setTimeout(function() {
				h.stopScrolling();
			}, 10000);
		}, 30000);
	},
	
	startScrolling: function() {
		var h = this;
		
		if (h.root.dom().parentElement.getClientRects()[0] && h.root.dom().getClientRects()[0] && h.root.dom().parentElement.getClientRects()[0].width < h.root.dom().getClientRects()[0].width) {
			h.root.dom().style.left = -(h.root.dom().getClientRects()[0].width - h.root.dom().parentElement.getClientRects()[0].width) + "px";
		}
	},
	
	stopScrolling: function() {
		var h = this;
		
		h.root.dom().style.left = "0px";
	},

	getMaterial: function() {
		return this.root;
	}
});	