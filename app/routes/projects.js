import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    //myThis.controllerFor('projects').set('projects', data);
    var url = 'https://api.github.com/users/amcolash/repos';
    return Ember.$.getJSON(url);
  }
});