/*
 * File
 * 
 * Kontrolka File obsługuje atrybut beana formularza typu file, który ma loid i name
 * 
 * Przykład:
 * 
 * var bean = {
 * 		name: "Nazwa",
 *      age: 12,
 *      report: {
 *      	loid: 1234,
 *      	name: "raport.txt"
 *      }
 * }
 * 
 * var form = new UI.Form({
 * 		fields: [
 * 			{
 * 				property: "report",
 * 				type: "File"
 * 			}
 * 		]
 * 		....
 * });
 * 
 * form.setBean(bean);
 */
UI.FileFormField = Class.create(UI.TextFormField, {

    initialize: function(config) {    
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {}        	
        }, config || {});
    },

    initConfig: function(config) {
        this.config = Object.extend({
        	property: "$",
        	disableTab: false,
        	readOnly: false,
        	width: 200,
        	bean: {},
        	uploadAction: UI.uploadAction,
        	jsonFileAttributeName: "name"
        }, config || {});

        this.render();
        this.setReadOnly(this.config.readOnly);
    },

	render: function() {
    	var h = this;
    	
		h.inside = new Element("DIV", {
			style: "position:relative; display:block; height:40px; width:100%; line-height:40px; background-color:transparent"
		});
		
		h.input = new Element("INPUT", {
			type: "text",
			style: "position:absolute; top:20px; left:10px; border:0px; background-color:transparent; color:#000000; width:" + h.config.width + "px"
		});
		h.input.disabled = true;
		h.input.on("focus", function() {
			h.animateLabel();
		});
		h.input.on("blur", function(e) {
			if (h.isEmpty(h.input.value)) {
				h.unanimateLabel()
			}
		});
		h.input.on("change", function(e) {
			if (h.config.onChange !== undefined) {
				h.config.onChange(h.getBeanValue());
			}
		});
		h.input.on("keyup", function(e) {
			h.setBeanValue(h.getInputValue());
			
			if (h.config.onChanging !== undefined) {
				h.config.onChanging(h.getBeanValue());
			}
		});
						
		h.label = new Element("DIV", {
			style: "position:absolute; top:10px; left:10px; border:0px; height:10px; color:#cdcdcf; font-weight:bold; font-size:14px;"
		});
		h.label.insert(h.config.label);

    	h.underline = new Element("DIV", {
    		style: "position:absolute; top:40px; left:10px; border:0px; height:2px; background-color:#cdcdcf; width:" + h.config.width + "px"
    	});

		h.inside.insert(h.underline);
		h.inside.insert(h.label);
		h.inside.insert(h.input);
		
		h.frameid = "file_upload_frame_" + h.config.property + "_" + new Date().getTime();

		h.fab = new UI.Fab({
			inside: h.inside,
			style: "position:absolute; left:" + (h.config.width - 10) + "px; width:20px; height:20px; top:18px;",
			fill: "green",
			icon: "download",
			bottom: 8,
			onClick: function() {				
				h.fileInput.click();
			}
		});

		h.initFileUploader();
	},
	initFileUploader: function() {
		var h = this;

		h.fileInput = new Element("INPUT", {
			type: "file",
			name: "fileName_" + h.frameid,
			style: "display:none"
		});

		var form = new Element("FORM", {
		    action: h.config.uploadAction,
		    method: "POST",
		    enctype: "multipart/form-data",
		    target: h.frameid,
		    style: "display:none; width:0px; height:0px"
		});

		h.inside.insert(form);
		form.insert(h.fileInput);

		h.fileInput.on("change", function() {

	    	h.progress = new UI.FabProgress({
	    		fab: h.fab
	    	});

			var form = new FormData();
				form.append("file", h.fileInput.files[0]);

			// send via XHR - look ma, no headers being set!
			var xhr = new XMLHttpRequest();

			xhr.upload.addEventListener("progress", function(e) {
				var pc = parseInt(100 - (e.loaded / e.total * 100));
				h.progress.setPercentage(100 - pc);
			}, false);

			xhr.onreadystatechange = function (evt) {
				if (xhr.readyState == 4) {
					h.progress.close();

					var createdFile = xhr.responseText.evalJSON();						
                    	h.setBeanValue(createdFile);
                    	h.setInputValue(createdFile);
                    	
            		if (h.config.onChange !== undefined) {
            			h.config.onChange(h.getBeanValue());
            		}
				}
			}

			xhr.open("POST", h.config.uploadAction, true);
			xhr.send(form);
		});
	},

    setInputValue: function(bean) {
    	var h = this;
    	
    	if (bean === undefined) {
    		bean = {};
    	}
    	
    	if (bean !== undefined) {
    		if(undefined !== eval("h.config.bean." + h.config.property)) {
        		h.animateLabel();
    			h.input.value = eval("h.config.bean." + h.config.property + "." + h.config.jsonFileAttributeName)
    		} else {
    			h.unanimateLabel();
    		}
    	} else {
    		h.input.value = "";
    		h.unanimateLabel();
    	}
    },

    setBeanValue: function(bean) {
    	var h = this;
    	eval("h.config.bean." + h.config.property + " = bean;");
    },

    showUploadFile: function() {
    	var h = this;    		
    }
});