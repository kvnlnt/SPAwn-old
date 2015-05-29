// The main app is a backbone router
// this allows us to have multiple controllers that inherit from router
// it also allows us to separate out controllers as "blueprints"
// namespacing distinct endpoints
App.Router = Backbone.Router.extend({

    initialize: function() {

        // setup container first, this will become available at app.container
        this.container = $("#body");

        // create instances of all the controllers we want to use
        // will be accessible at app.controllers
        this.controllers = {
          main: new App.Controllers.Main({
              router: this
          })
        };

        // XXX: initialize pollyfills

        // start backbone's uri poll
        Backbone.history.start();

    }

});

// on dom ready initialize the app
$(document).ready(function() {

    // Setup and Boot app
    window.app = new App.Router();
    window.app.controllers.main.view.render();

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
