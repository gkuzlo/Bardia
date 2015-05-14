
UI.Grid = Class.create(UI.MaterialComponent, {

	initConfig: function(config) {
        this.config = Object.extend({
        }, config || {});
	},

    initialize: function(config) {
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

        this.render();
    },

    render: function() {
    	var h = this;
    		h.material = new Element("DIV", {
    			style: "position: absolute; top:0px; right:0px; bottom:0px; left:0px"
    		});
    		h.config.inside.insert(h.material);

    		h.rowsHeader = new Element("DIV", {
    			class: "grid_header bg_main"
    		});
    		h.material.insert(h.rowsHeader);
    		h.rowsHeader.insert(h.config.title);

    		h.columnsContent = new Element("DIV", {
    			class: "list_content",
    			style: "height:50px; top:56px; left:5px"
    		});
    		h.material.insert(h.columnsContent);
    		
    		h.rowsContent = new Element("DIV", {
    			class: "list_content",
    			style: "bottom:0px; top:110px; left:5px"
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
    		
    	h.fetch({
    		rows: []
    	});
    },
    /**
     * @method setScrollTop
     */
    setScrollTop: function(pixels) {
    	var h = this;
    		h.rowsContent.scrollTop = pixels;
    },
    /**
     * @method fetch
     * 
     * Załadowanie grida wierszami z danymi
     */
    fetch: function(model) {
    	var h = this;

    	var rows = model.rows;

    	h.columnsContent.update();
    	h.rowsContent.update();

		var head = new Element("DIV", {
			style: "background-color:white; position:absolute; top:0px; right:0px; left:0px; height:30px; overflow:hidden; margin:0px; height:49px; line-height:48px; padding:0px; border:1px solid lightRey; border-width:0px 0px 1px 0px;",			
		});

		var k=0;
		for (k=0; k<h.config.columns.length; k++) {
			if (h.config.columns[k].width === undefined) {
				h.config.columns[k].width = 100;
			}

			var div = new Element("P", {
				style: "display:inline-block; overflow:hidden; line-height:47px; height:47px; font-size:14px; margin:0px; padding:0px; padding-left:4px; border:0px solid black; border-width:0px 0px 0px 0px; width:" + (h.config.columns[k].width) + "px",
				class: "bg_white fg_main grid_column_head"
			});

			div.update(h.config.columns[k].name);

			head.insert(div);
		}

		h.columnsContent.insert(head);

    	var i = 0;
    	for (i=0; i<rows.length; i++) {
    		var row = new Element("DIV", {
    			style: "display:block; overflow:hidden; height:25px; margin:0px; padding:0px; border:0px solid lightGrey; background-color:white; border-width:0px 0px 1px 0px; color:grey",
    			class: "row"
    		});

    		row.bean = rows[i];

    		for (k=0; k<h.config.columns.length; k++) {
    			var config = h.config.columns[k];

    			var cell = new Element("P", {
    				style: "opacity:0.7; display:inline-block; overflow:hidden; line-height:27px; height:27px; font-size:14px; margin:0px; padding:0px; padding-left:4px; border:0px solid #fcfcfc; border-width:0px 0px 1px 0px; width:" + (config.width) + "px",
    				class: "fg_main"
    			});

    			row.insert(cell);

    			if (config.render !== undefined) {
    				cell.update(config.render(row, cell));
    			} else {
    				cell.update(eval("rows[i]." + config.property));
    			}
    		}

    		h.rowsContent.insert(row);
    	}
    }
});