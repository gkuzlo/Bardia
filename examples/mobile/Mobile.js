/**
 *
 */
Mobile = Class.create({
	/*
	 *
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
        }, config || {});

        this.render();
    },
    /**
     *
     */
    render: function() {
        var h = this;

        h.material = new Element("DIV", {
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; background-color:white; display:flex; justify-content:center; align-items:center"
        });
        h.config.inside.update(h.material);

        h.mat = new Element("DIV", {
            style: "position:relative; width:324px; height:570px; border:5px solid grey;"
        });
        h.material.insert(h.mat);

        h.div = new Element("DIV", {
            style: "position:absolute; width:100%; bottom:50px; left:0px; right:0px; top:30px; border:0px;"
        });
        h.mat.insert(h.div);

        h.bottom = new Element("DIV", {
            style: "position:absolute; width:100%; height:50px; left:0px; right:0px; bottom:0px; border:0px; background-color:black; display:flex; justify-content:space-around; align-items:center;"
        });
        h.mat.insert(h.bottom);

        h.bottom.insert(new Element("IMG", {
            src: "images/back.png"
        }));

        h.bottom.insert(new Element("IMG", {
            src: "images/home.png"
        }));

        h.bottom.insert(new Element("IMG", {
            src: "images/stop.png"
        }));

        h.renderMenu();
    },
    renderMenu: function() {
        var h = this;

        try {
            new Menu({
                inside: h.div
            });
        } catch (e) {
            alert(e);
        }
    },
    /**
     *
     */
    renderTabs: function() {
        var h = this;

        h.tabs = new UI.Tabs({
            inside: h.div,
            tabs: [
                {
                    name: "Odjazdy"
                },
                {
                    name: "Rozkład"
                }
            ]
        });
    }
});