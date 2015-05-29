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
