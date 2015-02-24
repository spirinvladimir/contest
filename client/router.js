Router.map(function () {
  this.route('thehome', {
    path: '/',
    waitOn: function() {
      return [
        // Meteor.subscribe('uploads'),
        Meteor.subscribe('designs')
      ];
    },
    data: function() {
      return {
        // uploads: Uploads.find(),
        designs: Designs.find()
      }
    }
  });
});

Router.map(function () {
  this.route('submitdesign', {
    path: '/submitdesign',
    waitOn: function() {
      return [
        Meteor.subscribe('uploads'),
        Meteor.subscribe('designs')
      ];
    },
    data: function() {
      return {
        uploads: Uploads.find(),
        designs: Designs.find()
      }
    }
  });
});


Router.route('/contentheader', function () {
  this.render('contentheader');
});

Router.map(function () {
  this.route('vote', {
    path: '/vote',
    waitOn: function() {
      return [
        // Meteor.subscribe('uploads'),
        Meteor.subscribe('designs'),
        Meteor.subscribe('votes')
      ];
    },
    data: function() {
      return {
        //uploads: Uploads.remove({}),
        // uploads: Uploads.find(),
        designs: Designs.find(),
        votes: Votes.find()
      }
    }
  });
});