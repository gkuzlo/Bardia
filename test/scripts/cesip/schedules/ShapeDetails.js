/**
 * 
 */
cesip.schedules.ShapeDetails = bardia.oop.Class.create({

	initialize : function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
		}, config));
		
		this.render();
	},
	
	render: function() {
		var h = this;
		
		h.inside.update();
				
		try {
			var rest = new cesip.rest.REST({
				onSuccess: function(cdmConnection) {
					h.shape = cdmConnection;
					h.doRender();
				},
				onFailure: function() {
					alert("failure");
				}
			});
			rest.getConnectionDetails(h.shape);
		} catch (exc) {
			alert(exc);
		}
	},

	doRender: function() {
		var h = this;
		
		h.layout = new bardia.layout.BorderLayout({
			inside: h.inside,
			west: {
				width: 300
			}
		});

		h.form = new bardia.form.Form({
			inside: h.layout.getWest(),
			title: "Kształt",
			fields: [
			    {
			    	label: "fromStopPoint",
			    	property: "fromStopPoint",
			    	readonly: true
			    },
			    {
			    	label: "toStopPoint",
			    	property: "toStopPoint",
			    	readonly: true
			    },
			    {
			    	label: "length",
			    	property: "lengthMeters",
			    	type: "Integer",
			    	readonly: true
			    },
			    {
			    	label: "published",
			    	property: "published",
			    	type: "Boolean"
			    },
			    {
			    	label: "warning",
			    	property: "warning",
			    	type: "Boolean"
			    },
			],
			buttons: [
			    {
			    	title: "Powrot",
			    	icon: "chevron_left",
			    	onClick: function() {
			    		if (h.onClose) {
			    			h.onClose();
			    		}
			    	}
			    },
			    {
			    	title: "Zapisz",
			    	icon: "save",
			    	onClick: function() {
			    		var rest = new cesip.rest.REST({
			    			onSuccess: function() {
					    		if (h.onClose) {
					    			h.onClose();
					    		}
					    		if (h.onSave) {
					    			h.onSave();
					    		}
			    			},
			    			onFailure: function() {

			    			}
			    		});
			    		h.shape.published = h.form.getBean().published;
			    		h.shape.warning = h.form.getBean().warning;
			    		rest.saveConnection(h.shape);
			    	}
			    },
			]
		});

		h.form.setBean({
			fromStopPoint: h.shape.fromStopPoint.symbol + " " + h.shape.fromStopPoint.group.name,
			toStopPoint: h.shape.toStopPoint.symbol + " " + h.shape.toStopPoint.group.name,
			published: h.shape.published,
			warning: h.shape.warning
		});
		
		h.panel = new bardia.layout.Panel({
			inside: h.layout.getDefault(),
			title: "Kształt na mapie",
			buttons: [
			    {
			    	title: "Znajdź kształt",
			    	icon: "gesture",
			    	onClick: function() {
			    		if (!h.shape.nodes || h.shape.nodes.length <= 0) {
			    			h.resetShape();
			    		}
			    		h.findRoute();
			    	}
			    },
			    {
			    	title: "Reset",
			    	icon: "sync",
			    	onClick: function() {
			    		h.resetShape();
			    	}
			    }
			]
		});

		setTimeout(function() {
			h.displayMap();
			h.displayShape(h.shape);
		}, 500);
	},
    /**
     * @method renderMap
     */
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

	    	return function(feature, resolution) {
	    		if(feature.getGeometry().getType() == "Point") {
	    			return [new ol.style.Style({
		    				image: new ol.style.Circle({
			  	    		    radius: 5,
				    		    fill: new ol.style.Fill({
				    		    	color: 'white'
				    		    }),
				    		    stroke: new ol.style.Stroke({color: '#000055', width: 2})
				    		}),
			    			text: new ol.style.Text({
			    		    	textAlign: "center",
			    		        textBaseline: "middle",
			    		        font: "bold 14px Arial",
			    		        text: feature.name,
			    		        fill: new ol.style.Fill({color: "black"}),
			    		        stroke: null,
			    		        offsetX: 0,
			    		        offsetY: 10,
			    		        rotation: 0
				    		})
		    			})];
	    			} else {
	    				return styles[feature.getGeometry().getType()] || styles['default'];
			  		}
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
    				width: 6
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
    		};
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
            target: h.panel.getContent().dom(),
            view: new ol.View({
                center: ol.proj.transform([23.225, 53.125], 'EPSG:4326', 'EPSG:3857'),
                rotation: 0,
                zoom: 15
            })
    	});

    	h.map.on("moveend", function(e) {
    	});

    	/*
    	 * select interaction
    	 */
    	h.select = new ol.interaction.Select({
    		style: selectedStyle
    	});
    	h.map.addInteraction(h.select);

    	h.map.on("pointermove", function(e) {
    	});

    	/*
    	 * modify integraction
    	 */
		h.modify = new ol.interaction.Modify({
			features: h.select.getFeatures(),
			style: defaultStyle,
			deleteCondition: function(event) {
				return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
			}
		});
		h.map.addInteraction(h.modify);
		
		h.displayShapeOnMap();
    },

    displayShapeOnMap: function() {
    	var h = this;
    	
    	h.displayStopPointOnMap(h.shape.fromStopPoint);
    	h.displayStopPointOnMap(h.shape.toStopPoint);
    },

    displayStopPointOnMap: function(stopPoint) {
    	var h = this;

		var coordinates = ol.proj.transform([parseFloat(stopPoint.longitude), parseFloat(stopPoint.latitude)], 'EPSG:4326', 'EPSG:3857');

	    var marker = new cesip.map.Marker({
	    	icon: "images/marker.png",
        	title: "",
        	map: h.map,
        	stopEvent: false
        });
        var overlay = new ol.Overlay({
            element: marker.getMaterial(),
            position: coordinates
        });

        h.map.addOverlay(overlay);

        marker.setTitle(stopPoint.group.name);

        var feature = new ol.Feature(new ol.geom.Point(coordinates));
        feature.on("change", function(e) {	    	
	    	var coords = feature.getGeometry().getCoordinates();

    		var coord = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');
    		
    		stopPoint.longitude = coord[0];
    		stopPoint.latitude = coord[1];
	    });
        
        h.connectionVectors.getSource().addFeature(feature);

		h.map.getView().setCenter(overlay.getPosition());
    },

    findRoute: function() {
    	var h = this;
    	
    	h.select.getFeatures().clear();

    	var rest = new cesip.rest.REST({
    		onSuccess: function(model) {
    			h.shape.nodes = model.nodes;
    			h.displayShape(h.shape);
    		},
    		onFailure: function() {
    			
    		}
    	});
    	
    	rest.findRoute({
    		nodes: h.shape.nodes
    	});
    },

    displayShape: function(shape) {
    	var h = this;
    	
    	h.cleanMap();
    	
    	shape.nodes.sort(function(a, b) {
    		return a.orderNo - b.orderNo;
    	});

    	var coordinates = [];
    	shape.nodes.forEach(function(node) {
    		var coord = ol.proj.transform([parseFloat(node.longitude), parseFloat(node.latitude)], 'EPSG:4326', 'EPSG:3857');
			coordinates.push(coord);
    	});

	    var line = new ol.Feature(new ol.geom.LineString(coordinates));
	    line.isLine = true;

	    line.on("change", function(e) {
	    	var coords = line.getGeometry().getCoordinates();

	    	h.shape.nodes = [];
	    	coords.forEach(function(coordNotTransformed) {
	    		var coord = ol.proj.transform(coordNotTransformed, 'EPSG:3857', 'EPSG:4326');
	    		h.shape.nodes.push({
	    			longitude: coord[0],
	    			latitude: coord[1]
	    		});
	    	});
	    });

	    h.connectionVectors.getSource().addFeature(line);
    },

	resetShape: function() {
		var h = this;
		
		var connection = h.shape;
		connection.nodes = [];

		connection.nodes.push({
			orderNo: 0,
			longitude: connection.fromStopPoint.longitude,
			latitude: connection.fromStopPoint.latitude
		});

		connection.nodes.push({
			orderNo: 1,
			longitude: connection.toStopPoint.longitude,
			latitude: connection.toStopPoint.latitude
		});

		h.displayShape(h.shape);
	},
    cleanMap: function() {
    	var h = this;

    	var i=0;
    	for (i=0; i<h.connectionVectors.getSource().getFeatures().length; i++) {
    		var feature = h.connectionVectors.getSource().getFeatures()[i];
    		if (feature.isLine) {
    			h.connectionVectors.getSource().removeFeature(feature);
    		}
    	}
    },    
});