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
        
    return {
        create: create,
    };
    
})();