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
