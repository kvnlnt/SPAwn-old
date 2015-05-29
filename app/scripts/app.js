// The main app is a backbone router
// this allows us to have multiple controllers that inherit from router
// it also allows us to separate out controllers as "blueprints"
// namespacing distinct endpoints
App.Router = Backbone.Router.extend({

    initialize: function() {

        // setup container first, this will cascade down in the controller
        this.container = $("#body");

        // setup the current controller
        this.controller = new App.Controllers.Main({
            router: this
        });

        // XXX: initialize pollyfills

        // start backbone's uri poll
        Backbone.history.start();

    }

});

// on dom ready initialize the app
$(document).ready(function() {

    // Setup and Boot app
    window.app = new App.Router();
    window.app.controller.view.render();

    // Register App events
    App.PubSub.trigger(App.Events.ready);

    // resizing
    var resizeHandler = _.debounce(function() {
        App.PubSub.trigger(App.Events.app_resized);
    }, 300);

    $(window).resize(resizeHandler);

    // scrolling
    var scrollHandler = _.debounce(function() {
        App.PubSub.trigger(App.Events.app_scrolled);
    }, 300);

    $(window).scroll(scrollHandler);

});
