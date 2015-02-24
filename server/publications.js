Meteor.publish('uploads', function() {
  return Uploads.find();
})

Meteor.publish('designs', function() {
  return Designs.find();
})

Meteor.publish('votes', function() {
  return Votes.find();
})

