bardia.form.FileField = bardia.oop.Class.inherit(bardia.form.ActionField, {

    /**
     *  
     */
    displayButton: function() {
    	var h = this;

    	return $_element({
    		$_tag: "div",
    		style: "position:absolute; bottom:0px; left:170px; display:" + ((h.readOnly==true)?"none":"flex") + "; flex-direction:row",
    		$_append: [{
                $_tag: "button",
                class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
                $_on: {
                    click: function(e) {
                    	h.root.find(h.serial).dom().click();
                    }
                },
                $_append: [{
                    $_tag: "i",
                    class: "material-icons action-icon",
                    $_append: "file_upload",
                }]
            }, {
                $_tag: "button",
                class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
                $_on: {
                    click: function(e) {
                    	h.updateBeanProperty(undefined);
                    	h.updateInputValue(h.form.getBean());
                    }
                },
                $_append: [{
                    $_tag: "i",
                    class: "material-icons action-delete-icon",
                    $_append: "cancel",
                }]
            }, {
    			$_tag: "form",
    		    action: h.uploadAction || bardia.uploadAction,
    		    method: "POST",
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
    							if (xhr.readyState == 4 && xhr.status == 200) {
    								h.form.closeProgress();

    								var createdFile = JSON.parse(xhr.responseText);						
    			                    	h.updateBeanProperty(createdFile);
    			                    	h.updateInputValue(h.form.getBean());
    			                    	h.root.find(h.serial).dom().value = "";
    							}
    						};

    						var uploadUrl = h.uploadAction || bardia.uploadAction;
    						xhr.open("POST", uploadUrl + "?fileName=" + h.root.find(h.serial).dom().files[0].name, true);
    						
    						xhr.send(form);
    					}
    				}
    			}]
            }]
    	});
    	
    	/*
    	return $_element({
            $_tag: "button",
            class: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored",
            $_on: {
                click: function(e) {
                	h.root.find(h.serial).dom().click();
                }
            },
            $_append: [{
                $_tag: "i",
                class: "material-icons action-icon",
                $_append: "file_upload",
            }, {
    			$_tag: "form",
    		    action: h.uploadAction || bardia.uploadAction,
    		    method: "POST",
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
    							if (xhr.readyState == 4 && xhr.status == 200) {
    								h.form.closeProgress();

    								var createdFile = JSON.parse(xhr.responseText);						
    			                    	h.updateBeanProperty(createdFile);
    			                    	h.updateInputValue(h.form.getBean());
    			                    	h.root.find(h.serial).dom().value = "";
    							}
    						};

    						var uploadUrl = h.uploadAction || bardia.uploadAction;
    						xhr.open("POST", uploadUrl + "?fileName=" + h.root.find(h.serial).dom().files[0].name, true);
    						
    						xhr.send(form);
    					}
    				}
    			}]
    		}]
        });
    	*/
    },
    
    updateInputValue: function(bean) {
        var h = this;

        var file = eval("bean." + h.property + " || {name:''}");
        h.root.find(h.id(h.property)).dom().value = file.name;
    },
});