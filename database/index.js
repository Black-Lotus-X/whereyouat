var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://Roman:HackReactor16@ds141621.mlab.com:41621/whereyouat', function(err){
  if(err) console.log(err);
  console.log("connection successful");
});

module.exports = db;

// Change the mongoose connection, the current link will not work anymore once the Legacy project start.
