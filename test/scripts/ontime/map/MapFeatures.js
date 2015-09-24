/**
 * Klasa pokazuje niektóre możliwości OpenLayers3
 */
ontime.map.MapFeatures = bardia.oop.Class.create({

    initialize: function(config) {
        bardia.oop.Class.inherit(config, this);

        try {
            this.render();
        } catch (e) {
            alert(e);
        }
    },
    
    render: function() {
        var h = this;
        
        h.inside.insert(h.prepareRoot());
        h.displayMap();
    },

    prepareRoot: function() {
        var h = this;
        
        h.root = $_element({
            $_tag: "div",
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; overflow:hidden;"
        });
        
        return h.root;
    },
    
    displayMap: function() {
    	var h = this;
        
    	h.vectors = new ol.layer.Vector({
    		source: new ol.source.Vector({
    	    }),
    	    style: new ol.style.Style({
    	    	image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    	        anchor: [0.5, 46],
    	        anchorXUnits: 'fraction',
    	        anchorYUnits: 'pixels',
    	        opacity: 0.95,
    	        src: 'data/icon.png'
    	    })),
    	    stroke: new ol.style.Stroke({
    	    	width: 6,
    	        color: "rgba(0, 0, 0, 0.3)"
    	    	}),
    	        fill: new ol.style.Fill({
    	        	color: [0, 0, 255, 0.6]
    	        })
    	    })
    	});
        
	    var defaultStyle = (function() {
	    	var styles = {};

	    	styles['LineString'] = [new ol.style.Style({
			    stroke: new ol.style.Stroke({
			      color: "#6dbbcf",
			    	//color: "red",
			      width: 6
			    }),
			    fill: new ol.style.Fill({
			      color: 'rgba(0, 0, 255, 0.1)'
			    })
	    	})];

	    	styles['default'] = [new ol.style.Style({
			    stroke: new ol.style.Stroke({
			      color: "red",
			      width: 8
			    }),
			    fill: new ol.style.Fill({
			      color: 'rgba(255, 0, 255, 1)'
			    })
	    	})];
            
	    	styles['Point'] = [new ol.style.Style({
                image: new ol.style.Icon({
                    src: "images/marker.png"
                }),
                text: new ol.style.Text({
                    textAlign: "center",
                    textBaseline: "middle",
                    font: "bold 14px Arial",
                    text: "",
                    fill: new ol.style.Fill({color: "black"}),
                    stroke: null,
                    offsetX: 0,
                    offsetY: 10,
                    rotation: 0
                })
            })];

	    	return function(feature, resolution) {
                return styles[feature.getGeometry().getType()] || styles['default'];
            };
	    })();
        
    	h.connectionVectors = new ol.layer.Vector({
    		source: new ol.source.Vector({
    	    }),
    	    style: defaultStyle
    	});
        
    	var selectedStyle = (function() {
    		var styles = {};

    		styles['LineString'] = [new ol.style.Style({
    			stroke: new ol.style.Stroke({
    				color: 'red',
    				width: 3
    		    }),
    		    fill: new ol.style.Fill({
    		    	color: 'rgba(0, 0, 255, 0.1)'
    		    })
    		})];

    		return function(feature, resolution) {
    			if (feature.getGeometry().getType() == "Point") {
    				return [new ol.style.Style({
    					image: new ol.style.Circle({
  	  	    		    radius: 8,
  		    		    fill: new ol.style.Fill({
  		    		      color: 'white'
  		    		    }),
  		    		    stroke: new ol.style.Stroke({color: 'red', width: 4})
    					}),
    					text: null
    				})];
    			} else {
    				return styles[feature.getGeometry().getType()] || styles['default'];
    			}
    		}
    	})();

    	h.map = new ol.Map({
    		controls: ol.control.defaults().extend([
                new ol.control.FullScreen()
            ]),
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ]),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                h.vectors,
                h.connectionVectors
            ],
            target: h.root.dom(),
            view: new ol.View({
                center: ol.proj.transform([23.225, 53.125], 'EPSG:4326', 'EPSG:3857'),
                rotation: 0,
                zoom: 15
            })
    	});
        
        h.map.on("click", function(e) {
            h.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                alert(34);
            });
        });
        
        var coordinates = ol.proj.transform([23.225, 53.125], 'EPSG:4326', 'EPSG:3857');
        var feature = new ol.Feature(new ol.geom.Point(coordinates));
        h.connectionVectors.getSource().addFeature(feature);
        
    },

});