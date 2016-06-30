
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
					if (e.target.parentElement.getClientRects()[0].width < h.root.dom().getClientRects()[0].width) {
						h.root.dom().style.left = -(h.root.dom().getClientRects()[0].width - e.target.parentElement.getClientRects()[0].width) + "px";
					}
				},
				mouseout: function(e) {
					h.root.dom().style.left = "0px";
				}
			}
		});
	},

	getMaterial: function() {
		return this.root;
	}
});	