App.Controllers.Main = Backbone.Controller.extend({

    routes: {
        "": "default"
    },

    // initializations
    initialize: function() {},

    // default route
    default: function() {

        // this model holds helpful state related data
        this.model = new App.Models.Main();

        // set up the main view
        this.view = new App.Views.Main({
            model: this.model
        });

    },


});
