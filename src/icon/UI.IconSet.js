/**
 * @class UI.IconSet
 */
UI.IconSet = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
        	path: "",
        	hash: new Hash()
        }, config || {});

        this.config.hash.set("default", "/ic_stars_white_18dp.png");
        this.config.hash.set("menu", "/ic_stars_black_18dp.png");
        this.config.hash.set("done", "/ic_done_white_18dp.png");
        this.config.hash.set("menu", "/ic_reorder_white_18dp.png");
        this.config.hash.set("refresh", "/ic_cached_white_18dp.png");
        this.config.hash.set("help", "/ic_help_white_18dp.png");
        this.config.hash.set("download", "/ic_get_app_white_18dp.png");
        this.config.hash.set("calendar", "/ic_reorder_white_18dp.png");
        this.config.hash.set("cancel", "/ic_thumb_down_white_18dp.png");
        this.config.hash.set("add", "/ic_note_add_white_18dp.png");
        this.config.hash.set("close", "/ic_highlight_remove_white_18dp.png");
        this.config.hash.set("search", "/ic_pageview_white_18dp.png");
        this.config.hash.set("resize", "/ic_open_with_white_18dp.png");
        this.config.hash.set("login", "/ic_accessibility_white_18dp.png");
        this.config.hash.set("import", "/ic_input_white_18dp.png");
        this.config.hash.set("arrow_right", "/ic_trending_neutral_white_18dp.png");
    },
    getIcon: function(iconId) {
    	var h = this;
		
    	var result = "";
    	
    	var src = this.config.hash.get(iconId);
    		if (src === null || src === undefined) {
    			result = this.getIcon("help");
    		} else {
    			result = h.config.path + src;
    		}
    	return result;
    }
});