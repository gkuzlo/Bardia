/**
 * @class cesip.map.Marker
 */
cesip.map.Marker = bardia.oop.Class.create({
	/**
	 * @constructor
	 */
    initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
		}, config));

        this.create();
    },
    /**
     * @method create
     */
    create: function() {
    	var h = this;

    	h.material = $_element({
			$_tag: "div",
			id: "title",
			style: "cursor:grabbing; font-size:12px; height:20px; line-height:20px; background-color:rgba(255,255,255,0.5); border:1px solid black; padding:3px; border-radius:3px; wrap-word:no-wrap; " +
					"margin-top:-40px; margin-left:-50%; margin-right:50%",
			$_append: h.title 
    	});
    },
    setOverlay: function(overlay) {
    	this.overlay = overlay;
    },
    setTitle: function(title) {
    	this.material.update(title);
    },
    select: function() {
    	alert("cesip.map.Marker.select() not implemented");
    },
    unselect: function() {
    	alert("cesip.map.Marker.unselect() not implemented");
    },
    getMaterial: function() {
    	var h = this;
    	
    	return h.material.dom();
    }
});