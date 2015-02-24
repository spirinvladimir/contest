Meteor.methods({
  'updateVotes': function(votesId, score){
  	console.log('update server');
  	Votes.update({_id:votesId}, {$set:{score: score}});
  	console.log('server updated');
  },
  'deleteFile': function(_id) {
    check(_id, String);

    var upload = Uploads.findOne(_id);
    if (upload == null) {
      throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
    }

    UploadServer.delete(upload.path);
    Uploads.remove({_id: _id});
  },
  'deleteUserUploads': function(id) {
  	Uploads.remove({createdBy: id});
  },
  'updateUpload': function(userId, filename) {
  	Uploads.update({'name':filename}, {$set:{'createdBy': userId}});
  }

});