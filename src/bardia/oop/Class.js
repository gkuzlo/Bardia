bardia.oop.Class = (function() {
    
    function create(body) {
             
        function _create(config) {
            this.initialize(config);
        }
        
        for (attribute in body) {
            _create.prototype[attribute] = body[attribute];
        }
        
        //_class.prototype.constructor = _class;
        return _create;
    }
    
    function extend() {
        return null;
    }
        
    return {
        create: create,
        extend: extend
    };
    
})();