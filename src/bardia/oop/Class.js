bardia.oop.Class = (function() {

    function create(body) {

        function klass(config) {
            this.initialize(config); 
        }

        for (fun in body) {
            klass.prototype[fun] = body[fun];
        }

        return klass;
    }

    function extend(target, source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }

        return target;
    }

    function inherit(_function, body) {
        var klass = function(config) {
            this.initialize(config); 
        }

    	var fun = null;
    	for (fun in _function.prototype) {
    		klass.prototype[fun] = _function.prototype[fun];
    	}
    	
        for (fun in body) {
            klass.prototype[fun] = body[fun];
        }

    	return klass;
    }

    return {
        create: create,
        extend: extend,
        inherit: inherit
    };
    
})();