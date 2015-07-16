MBL.Confirm = Class.create({
	/*
	 *
	 */
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
            onYes: function() {
                alert("yes : ot implemented");
            },
            onNo: function() {
                alert("no : not implemented");
            }
        }, config || {});

        this.render();
    },
    render: function() {
        var h = this;

        h.material = new Element("DIV", {
            style: "position:absolute; top:0px; left:0px; right:0px; bottom:0px; background:white; display:flex; justify-content:space-around; align-items:center"
        });
        h.config.inside.update(h.material);

        h.controls = new Element("DIV", {
            style: "display:flex; flex-direction:column; justify-content:space-around; align-items:center; border:1px solid grey; border-radius:7px"
        });
        h.material.insert(h.controls);

        h.title = new Element("DIV", {
            style: "background:transparent; width:250px; height:30px; text-align:center"
        });
        h.title.update(h.config.title);
        h.controls.insert(h.title);

        h.buttons = new Element("DIV", {
            style: "background:transparent; width:150px; height:30px; display:flex; flex-direction:row; justify-content:space-around; align-items:center"
        });
        h.controls.insert(h.buttons);

        h.yesButton = new Element("DIV", {
            style: "width:50px; height:20px; background-color:rgba(210, 255, 210, 0.5); border:1px solid grey; border-radius:5px; text-align:center; cursor:pointer"
        });
        h.yesButton.update("Tak");
        h.buttons.insert(h.yesButton);
        h.yesButton.on("click", function() {
            h.config.onYes();
        });

        h.noButton = new Element("DIV", {
            style: "width:50px; height:20px; background-color:rgba(255, 210, 210, 0.5); border:1px solid grey; border-radius:5px; text-align:center; cursor:pointer"
        });
        h.noButton.update("Nie");
        h.buttons.insert(h.noButton);
        h.noButton.on("click", function() {
            h.config.onNo();
        });
    }
});