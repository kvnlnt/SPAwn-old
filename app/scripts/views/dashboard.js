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
