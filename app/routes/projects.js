import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var url = '';
    if (this.controllerFor('projects').get('name')) {
      url = 'https://api.github.com/users/amcolash/repos?sort=name';
    } else {
      url = 'https://api.github.com/users/amcolash/repos?sort=pushed';
    }
    return Ember.$.getJSON(url);
  }
});