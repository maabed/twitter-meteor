News = new Mongo.Collection('news');

News.allow({
  insert: function(userId) {
    var user = Meteor.users.findOne(userId);
    return user && user.admin;
  }
});

News.latest = function() {
  return News.findOne({}, {sort: {date: -1}, limit: 1});
}

if (Meteor.isServer) {
  console.log('server side message')
}
if (Meteor.isServer && News.find().count() === 0) {
  console.log('server side message')
  Meteor.startup(function() {
    News.insert({
      text: 'First of the season citrus has just arrived. Get succulent oranges and tangerines in our produce aisle!',
      date: new Date
    });
  });
}

if (Meteor.isClient) {
  console.log('console on lib directory')
}