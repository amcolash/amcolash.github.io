// Please note that Handlebars helpers will only be found automatically by the
// resolver if their name contains a dash (reverse-word, translate-text, etc.)
// For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html

import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function() {
  var d = new Date();
  return d.getFullYear();
});