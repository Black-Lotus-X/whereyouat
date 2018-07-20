let mongoose = require('mongoose');
let db = require('./index.js');

let userFavsSchema = mongoose.Schema({
  username: String,
  favoriteMessage: {type: String, required: true},
  fromWho: String,
  time : { type : Date, default: Date.now }
})

// This schema is for saving a favorite message by username. It takes in a username, a favorite messages,
// and from who it was sent.

let usersSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
})

// This schema is used for saving and retrieving users in the database.

let friendSchema = mongoose.Schema({
  username: {type: String, unique: false},
  friend: {type: String, _id: false}
})

// This schema is used to save a friend by both your username and their username. This way you can
// differentiate what users have what friends.

let Favorites = db.model('Favorites', userFavsSchema)
let Users = db.model('Users', usersSchema)
let Friends = db.model('Friends', friendSchema)


module.exports = {'Favorites': Favorites, 'Users': Users, 'Friends': Friends}
