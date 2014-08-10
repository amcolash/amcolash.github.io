export default Ember.Route.extend({
  model: function() {

    // function success(data) { // not currently necessary, playing with promises

    //   console.log(data);
    //   //myThis.controllerFor('projects').set('projects', data);
    //   return data;
    // }

    var url = 'https://api.github.com/users/amcolash/repos';
    return Ember.$.getJSON(url);
  }
});