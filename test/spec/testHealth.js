/* global describe, it */

(function () {
  'use strict';

  describe('Health Check', function () {
    describe('Sanity', function () {

      it('Tests are hooked up correctly', function () {
        assert(true, true);
      });

      it('app is a backbone application', function () {
        assert(app instanceof Backbone.Router, true);
        assert(app.controller instanceof Backbone.Controller, true);
      });

    });
  });

})();
