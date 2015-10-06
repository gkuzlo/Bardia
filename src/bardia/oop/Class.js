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
    	function klass(config) {
    		this.initialize(config);
    	}

    	var attribute = null;
    	for (attribute in _function.prototype) {
    		klass.prototype[attribute] = _function.prototype[attribute];
    	}
    	for (attribute in body) {
    		klass.prototype[attribute] = body[attribute];
    	}    
    	
    	return klass;
    }

    return {
        create: create,
        extend: extend,
        inherit: inherit
    };
    
})();