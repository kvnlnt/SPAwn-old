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
