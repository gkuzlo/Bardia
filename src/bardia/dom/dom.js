bardia.dom = {
}

$create = function(name, options) {
    var result = document.createElement(name);
    for (option in options) {
        result[option] = options[option];
    }
    return result'
}

Element.prototype.update = function(element) {
    this.appendChild(element);
}

Element.prototype.insert = function(element) {
    this.appendChild(element);
}