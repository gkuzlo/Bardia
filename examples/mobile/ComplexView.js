/**
 *
 */
ComplexView = Class.create({
	/*
	 * 
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
        }, config || {});

        this.render();
    },
    /**
     *
     */
    render: function() {
    	var h = this;

		h.mobile = new Mobile({
			inside: h.config.inside,
		});
    }
});