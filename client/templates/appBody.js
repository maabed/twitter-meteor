


Template.appBody.onCreated(function() {
  const subReady = Meteor.subscribe('users');
  if (subReady) {
    console.log('sub is Ready');
  }
});

Template.appBody.onRendered(function() {
});


Template.appBody.helpers({
  stdudents() {
    const data = Meteor.users.find({}).fetch()
    return data;
  }
});

Template.appBody.events({
  'click .js-menu': function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  },

  'click .js-back': function(event) {
    nextInitiator = 'back';
    
    // XXX: set the back transition via Location.back() when IR 1.0 hits
    history.back();
    event.stopImmediatePropagation();
    event.preventDefault();
  },
  
  'click a.js-open': function(event) {
    // On Cordova, open links in the system browser rather than In-App
    if (Meteor.isCordova) {
      event.preventDefault();
      window.open(event.target.href, '_system');
    }
  },

  'click .content-overlay': function(event) {
    Session.set(MENU_KEY, false);
    event.preventDefault();
  },

  'click #menu a': function(event) {
    nextInitiator = 'menu'
    Session.set(MENU_KEY, false);
  },
  
  'click .js-notification-action': function() {
    if (_.isFunction(this.callback)) {
      this.callback();
      notifications.remove(this._id);
    }
  }
});
