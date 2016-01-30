/**
 * 
 */
bardia.cmn.ProgressBar = bardia.oop.Class.create({

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
        	inside: $_element(window.document.body),
        	title: "waiting for ..."
        }, config || {}));
    },

    open: function() {
    	var h = this;

    	h.root = $_element({
        	$_tag: "div",
        	class: "bardia-progress",
        	$_append: [{
        		$_tag: "div",
        		id: "_spinner",
        		class: "mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active",
        		style: "z-index:100000001;"
        	}, {
        		$_tag: "div",
        		class: "bardia-progress-label",
        		style: "z-index:100000002;",
        		$_append: h.title
        	}]
        });
        
        $_upgradeElement(h.root.find("_spinner"));
        h.inside.insert(h.root);
    },
    
    close: function() {
    	var h = this;
    	    	
    	h.inside.dom().removeChild(h.root.dom());

    	delete h.root.dom();
    	delete h.root;
    }
});