
bardia.form.IntegerField = bardia.oop.Class.inherit(bardia.form.TextField, {

    initialize: function(config) {		
        bardia.oop.Class.extend(this, bardia.oop.Class.extend({
            label: "Boolean value ..."
        }, config));
        
        this.render();
    },
});