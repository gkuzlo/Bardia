/**

Materiał, który wysuwa się po wywołaniu metody show().
Po wywołaniu metody hide() - ucieka.
Może się wysuwać z róznych stron: left, right, top, button.
Jeżeli jest modalny to podczas wysuwania pojawia sie pod nim półprzeźroczysta kurtyna, która sprawia,
że kontet parenta jest lekko zasłonięty.

Animacja odbywa się w ten sposób, że materiał się wysuwa z jednej ze stron parenta (na przykład na gridzie, parenta podajemy w inside) a w tym czasie kurtyna zasłania obaszar grida.
Komponent jest appendowany do inside'a - czyli nie podmienia jego zawartości.

@class bardia.layout.Material
@constructor new bardia.lazout.Material();
@param config {JSONObject}
@param config.inside {bardia.dom.Element}
@param config.size=30 {Integer}
@param config.unit='%' {String -> 'px'|'%'}
@param config.edge='left' {String -> 'top'|'right'|'bottom'|'left'}
@param config.modal=false {Boolean -> true|false}
 
@example
~~~
var material = new bardia.layout.Material({
   inside: $_element(document.body),
   size: 90,
   unit: "%",
   edge: "left"
});

material.show();

material.getContent().insert($_element({
    $_tag: "DIV",
    $_append: "this is div content"
}));

~~~
 */
bardia.layout.Material = (function() {

    var h = this;

    function Material(config) {
    }

    /**
     * @method show()
     */
    Material.prototype.show = function() {
        
    }
    
    /**
     * @method hide()
     */
    Material.prototype.hide = function() {

    }
    
    /**
     * @method getContent()
     * @return {bardia.dom.Element}
     */
    Material.prototype.getContent = function() {

    }
    
    return Material;
})();