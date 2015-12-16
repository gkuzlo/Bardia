bardia.form.FileField = bardia.oop.Class.inherit(bardia.form.ActionField, {

    /**
     *  
     */
    displayButton: function() {
    	var h = this;

    	h.root.insert($_element({
            $_tag: "button",
            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
            $_on: {
                click: function(e) {
                	h.root.find(h.serial).dom().click();
                }
            },
            $_append: [{
                $_tag: "i",
                class: "material-icons",
                $_append: "file_upload",
            }, {
    			$_tag: "form",
    		    action: h.uploadAction || bardia.uploadAction,
    		    method: "POST",
    		    enctype: "multipart/form-data",
    		    target: h.serial,
    		    style: "display:none; width:0px; height:0px",
    		    $_append: [{
    				$_tag: "input",
    				type: "file",
    				name: "fileName_" + h.serial,
    				id: h.serial,
    				style: "display:none",
    				$_on: {
    					"change": function() {
    						h.form.openProgress();
    						
    						var form = new FormData();
    							form.append("file", h.root.find(h.serial).dom().files[0]);

    						var xhr = new XMLHttpRequest();

    						xhr.upload.addEventListener("progress", function(e) {
    							var pc = parseInt(100 - (e.loaded / e.total * 100));
    							h.form.setProgressLabel("" + (100 - pc) + " %");
    						}, false);

    						xhr.onreadystatechange = function (evt) {
    							if (xhr.readyState == 4) {
    								h.form.closeProgress();

    								var createdFile = JSON.parse(xhr.responseText);						
    			                    	h.updateBeanProperty(createdFile);
    			                    	h.updateInputValue(h.form.getBean());
    			                    	
    			            		if (h.onChange !== undefined) {
    			            			h.onChange(createdFile);
    			            		}
    							}
    						};

    						xhr.open("POST", h.uploadAction || bardia.uploadAction, true);
    						xhr.send(form);
    					}
    				}
    			}]
    		}]
        }));
    },
    
    updateInputValue: function(bean) {
        var h = this;

        var file = eval("bean." + h.property + " || {name:''}");
        h.root.find(h.id(h.property)).dom().value = file.name;
    },
});