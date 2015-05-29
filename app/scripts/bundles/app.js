// App container
var App = {

    // Router container
    Router: {},

    // Config container
    Settings: {},

    // Models container
    Models: {},

    // Collections container
    Collections: {},

    // Views container
    Views: {},

    // Controllers container
    Controllers: {},

    // Publish/Subscribe event bus
    PubSub: _.extend({}, Backbone.Events),

    // names of events in app
    Events: {
      app_resized:'APP:resized',
      app_scrolled:'APP:scrolled'
    },

    // keep track of device stuff
    Device: {
        widths: {
            mobile: 320,
            mobile_landscape: 520,
            tablet: 1024,
            desktop: 1280
        }
    }
};

App.Models.Main = Backbone.Model.extend({

    defaults: {},

});

// Base view class
App.Views.Base = Backbone.View.extend({

    // Why use assign?

    // ref: http://ianstormtaylor.com/rendering-views-in-backbonejs-isnt-always-simple/

    // Issues:
    // - Render should be able to be called multiple times without side effects.
    // - The order of the DOM should be declared in templates, not Javascript.
    // - Calling render again should maintain the state the view was in.
    // - Rendering twice shouldn’t trash views just to re-construct them again.

    // Solution:
    // make sure that delegateEvents is called to rebind the events on your subviews any time .html() runs. Backbone’s setElement calls delegateEvents already, therefore abstracting it out

    // FYIs
    // assumes there's a parent view that has targets for child views

    assign: function(view, selector) {
        view.setElement(this.$(selector)).render();
    }

});

App.Views.Dashboard = Backbone.View.extend({

    template: JST['dashboard.jst'],
    events: {},
    initialize: function() {},
    responsify: function() {},

    render: function() {
        this.$el.html(this.template());
        this.responsify();
        return this;
    }

});

App.Views.Header = Backbone.View.extend({

    template: JST['header.jst'],
    events: {},
    initialize: function() {},
    responsify: function() {},

    render: function() {
        this.$el.html(this.template());
        this.responsify();
        return this;
    }

});

// Main body view
// renders all child views for entire site
App.Views.Main = App.Views.Base.extend({

    id: 'main',
    template: JST['main.jst'],
    events: {},

    initialize: function() {

        this.header = new App.Views.Header({
            model: this.model
        });

        this.dashboard = new App.Views.Dashboard({
            model: this.model
        });

    },

    render: function() {

        // populate template
        this.$el.html(this.template());

        // render and attach childviews
        this.assign(this.header, '#header');
        this.assign(this.dashboard, '#dashboard');

        // add to container now, all done
        app.container.html(this.el);

        // call any setup scripts on child views
        this.header.responsify();
        this.dashboard.responsify();

        return this;

    }

});

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
