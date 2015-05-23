
UI.ProgressBar = Class.create(UI.MaterialComponent, {

    initConfig: function(config) {
        this.config = Object.extend({
        	orientation: "horizontal",
        	totalColor: "black",
        	doneColor: "green"
        }, config || {});
    },
    render: function() {
        var h = this;

        h.getMaterial().setStyle({
        	position: "relative",
        	display: "flex",
        	flexDirection: "column",
        	overflow: "hidden"
        });
        
        h.info = new Element("DIV", {
        	style: "height:30px; line-height:30px; display:flex"
        });
        h.getMaterial().insert(h.info);

    	h.label = new Element("DIV", {
    		style: "font-size:12px; flex:1; height:15px; line-height:30px; padding-left:10px; color:" + h.config.totalColor
    	});
    	h.info.insert(h.label);
        
    	h.percentageInfo = new Element("DIV", {
    		style: "font-size:12px; flex:1; height:15px; line-height:30px; padding-right:10px; text-align:right; color:" + h.config.totalColor
    	});
    	h.info.insert(h.percentageInfo);

        h.progress = new Element("DIV", {
        	style: "position:relative; height:10px; line:height:10px; display:flex;"
        });
        h.getMaterial().insert(h.progress);

    	
    	h.total = new Element("DIV", {
    		style: "position:absolute; top:0px; left:10px; right:10px; height:10px; background-color:" + h.config.totalColor
    	});
    	
    	h.done = new Element("DIV", {
    		style: "position:absolute; top:0px; left:10px; width:0px; height:10px; background-color:" + h.config.doneColor
    	});

    	h.progress.insert(h.total);
    	h.progress.insert(h.done);
    },

    setProgress: function(p) {
    	var h = this;

    	var progress = 0;
    	try {
    		progress = Math.max(0, Math.min(100, parseInt(p)));
    	} catch (e) {
    		progress = 10;
    	}

    	var width = h.total.getBoundingClientRect().right - h.total.getBoundingClientRect().left;    	
    	var newWidth = ((width * progress) / 100).toFixed(0);
    	
		h.percentageInfo.update(progress + " %");

		$PLAY(h.done, [
 		    { width: (h.done.getBoundingClientRect().right - h.done.getBoundingClientRect().left) + "px" },
 		    { width: newWidth + "px" },
 		]);
    },

    setLabel: function(label) {
    	var h = this;
    	
    	h.label.update(label);;
    },

    failure: function() {
    	var h = this;
    		h.total.setStyle({
    			backgroundColor: "red"
    		});
    		h.done.setStyle({
    			backgroundColor: "red"
    		});

    		if (h.config.onFinish) {
    			h.config.onFinish();
    		}
    },

    finish: function() {
    	var h = this;	
    		if (h.config.onFinish) {
    			h.config.onFinish();
    		}
    }
});