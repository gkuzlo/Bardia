/**
 * @class UI.SortableList
 */
UI.SortableList = Class.create(UI.MaterialComponent, {
	/**
	 * 
	 * @param config
	 */
	initConfig: function(config) {            	
        this.config = Object.extend({
        	title: "Insert title here ...",
        	renderer: function(row) {
        		return Object.toJSON(row.bean)
        	}
        }, config || {});
	},
	/**
	 * @method render
	 */
	render: function() {
		var h = this;

		var titleDiv = new Element("DIV", {
			class: "list_header"
		});
		h.getMaterial().insert(titleDiv);
		titleDiv.update(h.config.title);

		h.rowsContent = new Element("DIV", {
			style: "position:absolute; overflow:auto; top:60px; left:0px; right:0px; bottom:0px; display:flex; flex-flow:column; font-size:12px; line-height:20px; border:0px solid lightGrey;"
		});
		h.getMaterial().insert(h.rowsContent);
		
		var firstDiv = new Element("DIV", {
			style: "border:1px solid white; margin:2px 2px 0px 2px; padding:1px; border-radius:0px; border-width:0px 0px 3px 0px"
		});
		h.rowsContent.insert(firstDiv);

		firstDiv.on("dragover", function(e) {
			e.target.setStyle({
				borderBottomColor: "#525070"
			});
			e.preventDefault(); 
		});
		
		firstDiv.on("dragleave", function(e) {
			e.target.setStyle({
				borderBottomColor: "white"
			});
			e.preventDefault();
		});

		firstDiv.on("drop", function(e) {
			try {
				e.target.setStyle({
					borderBottomColor: "white"
				});

				var bean = null;
				eval("bean = " + e.dataTransfer.getData("text/html") + ";");

				var createdRow = h.createRow(bean);

				e.target.insert({
					after: createdRow
				});
			} catch (ex) {
				alert(ex);
			}
		});
	},
	/**
	 * @method fetch
	 * 
	 * @param model
	 */
	fetch: function(model) {
		var h = this;

		var i=0;
		for (i=0; i<model.rows.length; i++) {
			var row = model.rows[i];

			var rowDiv = h.createRow(row);

			h.rowsContent.insert(rowDiv);
		}
	},
	/**
	 * 
	 * @param row
	 * @returns {rowDiv0}
	 */
	createRow: function(row) {
		var h = this;
		
		var rowDiv = new Element("DIV", {
			style: "border:1px solid lightGrey; margin:0px 2px 0px 2px; padding:5px; border-radius:0px; border-width:1px 1px 3px 1px; border-bottom-color:white"
		});
		
		rowDiv.bean = row;

		rowDiv.update(h.config.renderer(rowDiv));
		rowDiv.draggable = true;

		rowDiv.on("click", function(e) {
			if (h.config.onClick) {
				h.config.onClick(e.target);
			}
		});
		
		rowDiv.on("dragover", function(e) {
			e.target.setStyle({
				borderBottomColor: "#525070"
			});

			e.preventDefault(); 
		});

		rowDiv.on("dragleave", function(e) {
			try {
				e.target.setStyle({
					borderBottomColor: "white"
				});

				e.preventDefault();
			} catch (ex) {
				//alert(ex);
			}
		});

		rowDiv.on("dragstart", function(e) {				
			e.target.setStyle({
				color: "#525070"
			});

			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData('text/html', ""+Object.toJSON(e.target.bean));
		});

		rowDiv.on("dragend", function(e) {
			e.target.remove();
		});
		
		rowDiv.on("drop", function(e) {
			try {
				e.target.setStyle({
					borderBottomColor: "white"
				});
				
				var bean = null;
				eval("bean = " + e.dataTransfer.getData("text/html") + ";");
				
				var createdRow = h.createRow(bean);

				e.target.insert({
					after: createdRow
				});
			} catch (ex) {
				alert(ex);
			}
		});
		
		return rowDiv;
	}
});