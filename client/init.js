// file: /client/init.js
Meteor.startup(function() {
  Uploader.finished = function(index, file) {
	//update createdBy to uploads.createdBy
	var userId = Meteor.userId();
	Session.set('uploadURL', file.url);
	Meteor.call('updateUpload', userId, file.name);
  }
});
