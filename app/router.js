import Ember from 'ember';

var Router = Ember.Router.extend({
  //location: HomeENV.locationType
});

Router.map(function() {
  this.route("projects", { path: "/projects" });
  this.route("about", { path: "/about" });
});

export default Router;