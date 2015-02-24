if(Meteor.isClient){

  Meteor.subscribe('designs');
  Meteor.subscribe('uploads');
  Meteor.subscribe('votes');

  Template.contentheader.events({
    'click .resetUpload': function(){
      Session.get('uploadURL', '');
      var userId = Meteor.userId();
      Meteor.call('deleteUserUploads', userId);
      Router.go('/submitdesign');
    }

  });

  Template.vote.helpers({
    'designs': function(){
      var userId = Meteor.userId();                                                                                      // 43
      return Designs.find({}, {sort:{score: -1, title: 1}});
    },
    'getUser': function(id){
      console.log(Meteor.users.findOne(id));
      if(Meteor.users.findOne(id).profile){
        return Meteor.users.findOne(id).profile.name;        
      }else{
        return Meteor.users.findOne(id).emails[0]['address'];
      }           
    },
    'userVotes': function(designId, voteId){
      var userId = Meteor.userId();
      var getVotes = Votes.findOne({designId:designId, votedBy: userId});
      if(getVotes){
        if(voteId == getVotes.score){
          return 'vote-active'; 
        }  
      }      
    }
  });

  Template.vote.events({
    'click #vote': function(e){
      var designId = this._id;
      var userId = Meteor.userId();
      var theScore = parseInt(e.target.name);
      //add user to uservotes collections.
      console.log('The design id'+designId);
      console.log('The Score '+theScore);
      console.log('Voted by '+userId);
      var countVotes = Votes.findOne({'designId':designId, 'votedBy':userId});
      if(countVotes){
        var currScore = countVotes.score;
        var adjustScore = theScore - currScore;
        Designs.update({_id:designId}, {$inc: {score: adjustScore}});
        Meteor.call('updateVotes', countVotes._id, theScore);
      }else{
        Votes.insert({designId: designId, score: theScore, votedBy: userId});
        Designs.update({_id:designId}, {$inc: {counter: 1, score: theScore}});        
      }
      
    }
  });

  Template.addPlayerForm.events({     
    'submit form': function(){
      event.preventDefault();
      var designURL = Session.get('uploadURL');
      var title = event.target.designTitle.value;
      var descriptions = event.target.designDescription.value;
      var printingNotes = event.target. printingNotes.value;
      var agreeLegal = event.target.  agree_legal.value;
      var currentUserId = Meteor.userId();
      
      var upload = Designs.insert({designURL: designURL, title: title, descriptions: descriptions, printing_notes: printingNotes, agree_legal: agreeLegal, counter: 0, score: 0, createdBy: currentUserId});
      if(upload){
        Session.get('uploadURL', '');
        Router.go('/vote');
      }
    }
  });

  Template.addPlayerForm.helpers({
    myFormData: function() {
      return { directoryName: 'images', prefix: this._id, _id: this._id }
    },
    filesToUpload: function() {
      return Uploader.info.get();
    }    
  });

  Template.uploadedInfo.helpers({
    getUserImage: function(id){
      var userId = Meteor.userId();
      if(this.createdBy == userId){
          return 'show';  
      }else{
        return 'hide';
      }   
    },    
    src: function() {
      var userId = Meteor.userId();
      if (this.type.indexOf('image') >= 0) {
        if(this.createdBy == userId){
          return 'upload/' + this.path;  
        }        
      } else return 'file_icon.png';
    }
  });

  Template.uploadedInfo.events({
    'click .deleteUpload':function() {
      if (confirm('Are you sure?')) {
        Meteor.call('deleteFile', this._id);
      }
    }
  });
}