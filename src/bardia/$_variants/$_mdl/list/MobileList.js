/**
 *
 */
bardia.list.MobileList = (function() {
    
    var h = this;
    
    function prepareRoot() {
        var result = $_element({
            $_tag: "ul",
            class: "collection with-header",
            $_append: [{
                $_tag: "li",
                class: "collection-header",
                $_append: "<h4>First Names</h4>"
            }, {
                $_tag: "li",
                class: "collection-item",
                $_append: "Wojtek"
            }, {
                $_tag: "li",
                class: "collection-item",
                $_append: "Ela"
            }, {
                $_tag: "li",
                class: "collection-item",
                $_append: "Piotr",
                $_on: {
                    "click": function(e) {
                        alert(e);
                    }
                }
            }]
        });

        return result;
    }

    function _mobileList(config) {
        var root = prepareRoot();
        config.inside.insert(root);
    };

    return _mobileList;
})();

/*
      <ul class="collection with-header">
        <li class="collection-header"><h4>First Names</h4></li>
        <li class="collection-item">Alvin</li>
        <li class="collection-item">Alvin</li>
        <li class="collection-item">Alvin</li>
        <li class="collection-item">Alvin</li>
      </ul>
 */