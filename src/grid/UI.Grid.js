/**
 * @class UI.Grid
 */
UI.Grid = Class.create(UI.MaterialComponent, {
	/**
	 * @param initConfig
	 */
    initConfig: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            title: "Insert title here ...",
            columns: [
                {
                	name: "",
                	width: 100
                }
            ],
            rows: [
            ]
        }, config || {});
    },
    /**
     * @method render
     */
    render: function() {
    	var h = this;

    		h.mainLayout = new UI.BorderLayout({
    			inside: h.getMaterial(),
    			north: {
    				height: 60
    			},
    			south: {
    				height: 60
    			}
    		});

    		h.mainLayout.getNorth().addClassName("grid_header");

    		h.material = new Element("DIV", {
    			style: "position: absolute; top:0px; right:0px; bottom:0px; left:0px"
    		});
    		h.mainLayout.getDefault().insert(h.material);

    		h.titleDiv = new Element("DIV", {
    			style: "transform:scale(1.5); position:absolute; top:5px; left:10px; color:#525070; height:20px; width:300px; -moz-transform-origin: 0 0; font-size:12px"
    		});
    		h.mainLayout.getNorth().insert(h.titleDiv);

    		h.toolbarDiv = new Element("DIV", {
    			style: "transform:scale(0.5); position:absolute; top:25px; height:30px; left:10px; background-color:transparent; width:100%; -moz-transform-origin: 0 0;",
    			class: "grid-toolbar"
    		});
    		h.mainLayout.getNorth().insert(h.toolbarDiv);
    		
    		h.toolbarDiv.on("mouseover", function(e) {
    			h.expandToolbar();
    			e.cancelBubble = true;
    			e.returnValue = false;
    			return false;
    		});
    		
    		h.mainLayout.getNorth().on("mouseover", function(e) {
    			h.expandTitle();
    		});
    		
    		h.toolbar = new UI.GridToolbar({
    			inside: h.toolbarDiv,
    			buttons: h.config.buttons || []
    		});

    		h.columnsContent = new Element("DIV", {
    			class: "grid_content",
    			style: "height:50px; top:2px; left:5px; border:2px solid lightGrey; border-width:0px 0px 2px 0px"
    		});
    		h.material.insert(h.columnsContent);

    		h.rowsContent = new Element("DIV", {
    			class: "grid_content",
    			style: "bottom:0px; top:70px; left:5px"
    		});
    		h.rowsContent.on("scroll", function(e) {
    			if (h.config.onScrollTop) {
    				h.config.onScrollTop(e.target.scrollTop);
    			}
    		});
    		h.material.insert(h.rowsContent);

    		this.rowsContent.on("click", "div.row", function(e, element) {
    			if (h.config.onClick) {
    				h.config.onClick(element);
    			}
    		});
    		
    		new UI.Form({
    			inside: h.mainLayout.getSouth(),
    			fields: [
    		         {
    		        	 property: "search",
    		        	 label: "Szukaj",
    		        	 disableTab: true,
    		        	 onChanging: function(v) {
    		        		 var f = function() {
    		        			 h.filter(v);	 
    		        		 }
    		        		 setTimeout(f, 0);
    		        	 }
    		         }
    			]
    		});

    	h.setTitle(h.config.title);
    		
    	h.fetch({
    		rows: []
    	});
    },
    /**
     * @method: expandToolbar
     */
    expandToolbar: function() {
    	var h = this;
    	
    	if (!h.toolbarExpanded && !h.inProgress) {
    		
    		h.inProgress = true;
	    	
    		$PLAY(h.toolbarDiv, [
	    	    {transform: "scale(0.5)"},
	    	    {transform: "scale(1)"}
	    	], function() {
    			delete h.inProgress
    		});
	    	
	    	$PLAY(h.titleDiv, [
	     	    {transform: "scale(1.5)"},
	     	    {transform: "scale(1)"}
	     	], function() {
    			delete h.inProgress
    		});
	    	
	    	h.toolbarExpanded = true;
    	}
    },
    /**
     * 
     */
    expandTitle: function() {
    	var h = this;
    	
    	if (h.toolbarExpanded && !h.inProgress) {
    		
    		h.inProgress = true;
	    	
    		$PLAY(h.toolbarDiv, [
	    	    {transform: "scale(1)"},
	    	    {transform: "scale(0.5)"}
	    	], function() {
    			delete h.inProgress
    		});
	    	
	    	$PLAY(h.titleDiv, [
	     	    {transform: "scale(1)"},
	     	    {transform: "scale(1.5)"}
	     	], function() {
    			delete h.inProgress
    		});
	    	
	    	delete h.toolbarExpanded;
    	}
    },
    /**
     * @method setScrollTop
     */
    setScrollTop: function(pixels) {
    	var h = this;
    		h.rowsContent.scrollTop = pixels;
    },
    setTitle: function(title) {
    	var h = this;
    	
    	h.titleDiv.update(title);
    },
    /**
     * @method fetch
     * 
     * Załadowanie grida wierszami z danymi
     */
    fetch: function(model) {
    	var h = this;

    	h.columnsContent.update();
    	h.rowsContent.update();

		var head = new Element("DIV", {
			class: "grid-column-head",			
		});
		
		h.config.columns
			.map(function(column) {
				column.width = column.width || 100;
				
				var div = new Element("P", {
					style: "width:" + (column.width) + "px",
					class: "grid-column bg_white fg_main grid_column_head"
				});
	
				div.update(column.name);
	
				return div;
			})
			.forEach(function(div) {
				head.insert(div);
			});

		h.columnsContent.insert(head);

		model.rows.forEach(function(bean) {

    		var row = new Element("DIV", {
    			class: "grid-row row"
    		});

    		row.bean = bean;

    		h.config.columns.forEach(function(config) {
    			var cell = new Element("P", {
    				style: "width:" + (config.width) + "px",
    				class: "grid-cell fg_main"
    			});

    			row.insert(cell);

    			if (config.render !== undefined) {
    				cell.update(config.render(row, cell));
    			} else {
    				cell.update(eval("bean." + config.property));
    			}    			
    		});
    		
    		setTimeout(function() {}, 10);

    		h.rowsContent.insert(row);	
		});
    },
	filter: function(v) {
		var h = this;

		var i=0;
		for (i=0; i<h.rowsContent.childElements().length; i++) {
			var child = h.rowsContent.childElements()[i];
			if (child.innerHTML.toLowerCase().indexOf(v.toLowerCase()) >= 0) {
				child.show();
			} else {
				child.hide();
			}
		}
	}
});