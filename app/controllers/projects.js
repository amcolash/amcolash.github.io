import Ember from 'ember';

export default Ember.Controller.extend({

  name : true,
  push : false,

  actions : {
    nameSort : function() {
      this.set('name', true);
      this.set('push', false);
      this.send('sort');
    },
    pushSort : function() {
      this.set('name', false);
      this.set('push', true);
      this.send('sort');
    },
    sort : function() {
      var temp = this.get('model');
      var projects = [];
      for (var x=0; x<temp.length; x++) {
        projects.push(temp[x]);
      }
      console.log(projects);

      if (this.get('name')) {
        projects.sort( function(a, b) {
          console.log("comapring b: " + b.name + ", to a: " + a.name);
          return a.name.localeCompare(b.name);
        });
      } else {
        projects.sort( function(a, b) {
          a = new Date(a.pushed_at);
          b = new Date(b.pushed_at);
          console.log("comapring b: " + b.valueOf() + ", to a: " + a.valueOf());
          return b.valueOf() - a.valueOf();
        });
      }

      console.log(projects);
      this.set('model', projects);
    }
  }

});
