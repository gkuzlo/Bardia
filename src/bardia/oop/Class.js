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
        for (prop in source) {
            target[prop] = source[prop];
        }
        return target;
    }

    return {
        create: create,
        extend: extend
    };
    
})();