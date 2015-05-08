/**
* This is the description for my class.
*
* @class UI.Crud
* @constructor
*/
UI.Crud = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 */
	initConfig: function(config) {
        this.config = Object.extend({
        }, config || {});
	},
	/**
	 * 
	 */
	render: function() {
		var h = this;

		if (h.config.list !== undefined) {
			h.config.list.inside = h.getMaterial();
			h.list = new UI.List(h.config.list);
		}

		h.curtain = new Element("DIV", {
			style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; opacity:0.9; display:none",
			class: "bg_main"
		});
		h.getMaterial().insert(h.curtain);

		h.mat = new UI.Material({
			inside: h.getMaterial(),
			effect: "from-right",
			position: "top:0px; right:0px; bottom:0px; width:350px"
		});
		
		if (h.config.form !== undefined) {
			h.config.form.inside = h.mat.getMaterial();
			h.form = new UI.Form(h.config.form);
		}
	},
	/**
	 * @method openForm
	 */
	openForm: function(bean) {
		var h = this;
		if (bean !== undefined) {
			h.form.setBean(bean);
		}
		
		h.curtainOn();
		h.mat.show();
	},
	/**
	 * @method closeForm
	 */
	closeForm: function() {
		var h = this;

		h.curtainOff();
		h.mat.hide();
		
		if (h.config.onCloseForm) {
			h.config.onCloseForm();
		}
	},
	/**
	 * @method updateForm
	 */
	updateForm: function(bean) {
		var h = this;
		h.form.setBean(bean);
	},
	/**
	 * Pobranie formularza z komponentu CRUD
	 * 
	 * @method getForm
	 */
	getForm: function() {
		return this.form;
	},
	/**
	 * @method getBean
	 */
	getBean: function() {
		var h = this;
		return h.form.getBean();
	},
	curtainOn: function() {
		var h = this;
		
		h.curtain.setStyle({
			display: "block"
		});
		
		var player = h.curtain.animate([
  		    {opacity: 0},
  		    {opacity: 0.8},
  		], {
  			direction: 'normal',
  		    duration: 200,
  		    easing: "ease",
  			iterations: 1,
  			fill: "both"
  		});
		
	},
	curtainOff: function() {
		var h = this;

		var player = h.curtain.animate([
		    {opacity: 0.8},
		    {opacity: 0},
		], {
			direction: 'normal',
		    duration: 200,
		    easing: "ease",
			iterations: 1,
			fill: "both"
		});
		
   		player.onfinish = function(e) {
   			h.curtain.setStyle({
   				display: "none"
   			});
		}
	},
	/**
	 * @method fetchList
	 */
	fetchList: function(beans) {
		var h = this;
		
		h.list.fetch({
			rows: beans
		});
	}
});