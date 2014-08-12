import Ember from 'ember';

export default Ember.Controller.extend({

  sortName : false,

  actions : {
    nameSort : function() {
      this.set('sortName', true);
      this.send('sort');
    },
    pushSort : function() {
      this.set('sortName', false);
      this.send('sort');
    },
    sort : function() {
      var temp = this.get('model');
      var projects = [];
      for (var x=0; x<temp.length; x++) {
        projects.push(temp[x]);
      }
      console.log(projects);

      if (this.get('sortName')) {
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
