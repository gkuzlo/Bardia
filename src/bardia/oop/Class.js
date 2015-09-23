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
    
    function inherit(source, target) {
        for (prop in source) {
            target[prop] = source[prop];
        }
    }

    return {
        create: create,
        inherit: inherit
    };
    
})();