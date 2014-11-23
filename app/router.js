import Ember from 'ember';

var Router = Ember.Router.extend({
  rootUrl: "/"
  //location: HomeENV.locationType
});

Router.map(function() {
  this.route("projects", { path: "/projects" });
  this.route("about", { path: "/about" });
  this.route("error", { path: "/error" });
});

export default Router;
