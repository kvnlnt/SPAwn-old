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
