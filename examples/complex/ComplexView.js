ComplexView = Class.create({
    initialize: function(config) {
        this.config = Object.extend({
            inside: window.document.body,
        }, config || {});

        this.render();
    },
    render: function() {
    	var h = this;

        h.mainLayout = new UI.BorderLayout({
            inside: h.config.inside,
            north: {
                height: 600
            },
            west: {
                width: 500
            },
            south: {
                height: 100
            }
        });

        h.mainGrid = new UI.Grid({
            inside: h.mainLayout.getNorth(),
            title: "Grid 1",
            detailsWidth: "300px",
            quickSearch: false,
            columns: [{
                name: "Imię",
                property: "name",
                width: 400
            }, {
                name: "Nazwisko"
            }, {
                name: "Wiek",
                property: "age",
                render: function(row) {
                    return "Wiek: " + row.bean.age
                }
            }],
            onClick: function(row) {
                //alert(Object.toJSON(row.bean));

                var material = h.mainGrid.openDetails();

                h.showDetails(material.getMaterial(), row.bean);
            },
            onPageChanged: function(page) {
                //alert("Page changed to: " + page);
            }
        });

        h.mainGrid.fetch({
            rows: [{
                name: "Grzegorz"
            }, {
                name: "Wojciech",
                age: 20
            }],
            descriptor: {
                totalAmount: 100,
                currentPage: 1,
                pageSize: 10
            }
        });

        h.secGrid = new UI.Grid({
            inside: h.mainLayout.getDefault(),
            title: "Grid 2",
            detailsWidth: "300px",
            quickSearch: false,
            columns: [{
                name: "Imię",
                property: "name",
                width: 400
            }, {
                name: "Nazwisko"
            }],
        });

        var tabs = new UI.Tabs({
            inside: h.mainLayout.getWest(),
            tabs: [{
                name: "A",
                onActivate: function(html) {
                    new UI.Grid({
                        inside: html,
                        title: "INSIDE",
                        columns: [{
                            name: "Zawód"
                        }]
                    });
                }
            }, {
               name: "B",
                onActivate: function(html) {
                    new UI.Grid({
                        inside: html,
                        title: "OUTSIDE",
                        columns: [{
                            name: "Rodzice"
                        }]
                    });
                }
           }]
        });
    },
    showDetails: function(html, person) {
        var h = this;

        var form = new UI.Form({
            inside: html,
            fields: [{
                label: "Name",
                property: "name",
                required: true,
                type: "Boolean"
            }],
            buttons: [{
                customIcon: "dsf",
                onClick: function() {
                    form.validate();
                    h.mainGrid.closeDetails();
                }
            }]
        });

        form.setBean(person);
    }
});