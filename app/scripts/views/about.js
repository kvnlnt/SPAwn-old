App.Views.About = App.Views.Base.extend({

    id: 'about',
    template: JST['about.jst'],
    events: {},

    initialize: function() {

       this.header = new App.Views.Header({
            model: this.model
        });

    },

    render: function() {

        // populate template
        this.$el.html(this.template());

        // render and attach childviews
        this.assign(this.header, '#header');

        // add to container now, all done
        app.container.html(this.el);

        // call any setup scripts on child views
        this.header.responsify();

        return this;

    }

});
