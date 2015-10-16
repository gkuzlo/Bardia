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
    		style: "position:relative; cursor:grabbing; display:flex; align-items:center; flex-wrap:wrap; flex-direction:column; margin-left:-100%; background-color:transparent; opacity:1; margin-top:-24px",
    		$_on: {
    			"mousedown": function(e) {
    				h.map.selectedOverlay = h.overlay;
    			},
    			"mouseup": function(e) {
    				h.map.selectedOverlay = undefined;
    			}
    		},
    		$_append: [{
    			$_tag: "img",
        		src: h.icon,
        		style: "opacity:0.9; cursor:grabbing; user-drag:none;",
        		draggable: false
    		}, {
    			$_tag: "div",
    			id: "title",
    			style: "cursor:grabbing; font-size:12px; background-color:rgba(255,255,255,0.9); border:1px solid black; padding:5px; margin:5px; border-radius:3px; wrap-word:no-wrap",
    			$_append: h.title 
    		}, {
    			$_tag: "div",
    			style: "position:absolute; top:0px; left:0px; width:100%; height:100%; background-color:rgba(0,0,0,0.0)",
    		}]
    	});
    },
    setOverlay: function(overlay) {
    	this.overlay = overlay;
    },
    setTitle: function(title) {
    	this.material.find("title").update(title);
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