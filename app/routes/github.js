import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var url = '';
    if (this.controllerFor('github').get('name')) {
      url = 'https://api.github.com/users/amcolash/repos?type=all&sort=name';
    } else {
      url = 'https://api.github.com/users/amcolash/repos?type=all&sort=pushed';
    }
    return Ember.$.getJSON(url);
  }
});