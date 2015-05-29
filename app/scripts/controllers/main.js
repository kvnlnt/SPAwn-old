App.Controllers.Main = Backbone.Controller.extend({

    routes: {
        "": "default",
        "dashboard":"dashboard",
        "about":"about"
    },

    // initializations
    initialize: function() {},

    // default route, don't render...it's called automatically via boot
    default: function() {

        // this model holds helpful state related data
        this.model = new App.Models.Main();

        // set up the main view
        this.view = new App.Views.Main({
            model: this.model
        });

    },

    // dashboard route
    dashboard: function() {

        // this model holds helpful state related data
        this.model = new App.Models.Main();

        // set up the main view
        this.view = new App.Views.Main({
            model: this.model
        });
        this.view.render();

    },

    // about route
    about: function() {

        // set up the main view
        this.view = new App.Views.About();
        this.view.render();

    },


});
