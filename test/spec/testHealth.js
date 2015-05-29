/* global describe, it */

(function () {
  'use strict';

  describe('Health Check', function () {
    describe('Sanity', function () {

      it('App namespacing is stable', function () {

        var keys = [
          'Router',
          'Config',
          'Models',
          'Pages',
          'Collections',
          'Views',
          'Controllers',
          'Index',
          'PubSub'
        ];

        assert(_.keys(App), keys);
      });

      it('app is a backbone application', function () {
        assert(app instanceof Backbone.Router, true);
        assert(app.controller instanceof Backbone.Controller, true);
      });

    });
  });

})();
