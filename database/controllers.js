let {Favorites, Users, Friends} = require('./schemas.js')

exports.getUsers = (req, res) => {
  Users.find({})
       .then(response => res.send(response))
       .catch(err => res.send(err))
}

// This will get all the users from the database. There is nothing using this on the client, this is for admin use.

exports.saveUser = (req, res) => {
  return new Users ({
    username: req.body.username
  }).save()
    .then(response => res.send('user added'))
    .catch(err => res.send(err))
}

// This will save a user to the database, works when signing up in the client.

exports.retrieveUser = (req, res) => {
  let {username} = req.params
  return Users.find({username: username}).then(response => {
    if (response.length === 0) res.sendStatus(404)
    else res.send(response)
  }
).catch(err => res.send(err))}

// This will retrieve the user during login auth.

exports.retrieveAllMessages = (req, res) => {
  let {username} = req.params
  Favorites.find({username: username}).then(response => {
    if (response.length === 0) res.send('No favorite messages found')
    else res.send(response)
  }
).catch(err => res.send(err

// This will show all the messages that have been saved by the user. Filtered in the client by friends username.

exports.saveMessage = (req, res) => {
  new Favorites ({
    username: req.body.username,
    favoriteMessage: req.body.favoriteMessage,
    fromWho: req.body.fromWho
  }).save()
    .then(response => res.send('favorite message added'))
    .catch(err => res.send(err))
}

// This will save a message by message, username, and friend name, and works on the client on the Floppy Disk sign.

exports.deleteMessage = (req, res) => {
  let {username} = req.params
  Favorites.deleteOne({favoriteMessage: req.body.favoriteMessage})
           .then(response => res.send('deleted one'))
           .catch(err => res.send(err))
}

// This will delete the message by the message text. This has not been implemented, but it works.

exports.deleteAllMessages = (req, res) => {
  Favorites.remove({})
           .then(response => res.send('all messages by user deleted'))
           .catch(err => res.send(err))
}

// This will delete all the messages by the user. This has not been implemented, but it works.

exports.retrieveFriends = (req, res) => {
  let {username} = req.params
  Friends.find({username: username}).then(response => {
    if (response.length === 0) res.send([{friend: ''}])
    else res.send(response)
  }
).catch(err => res.send(err))}

// This will retrieve all the friends by username. It is displayed in the friends bar on client side.

exports.saveFriend = (req, res) => {
  console.log('saving friends username', req.body.username);
  console.log(req.body.fromWho);
  new Friends ({
    username: req.body.username,
    friend: req.body.fromWho
  }).save()
    .then(response => res.send('saved friend')).catch((response)=> res.status(400).send('saved friend erorr'));
}

// This will save a friends username to the database by your username. This happens on friends name click on the client.

exports.deleteFriend = (req, res) => {
  Friends.deleteOne({friend: req.body.fromWho}).then(response => {
    Favorites.remove({fromWho: req.body.fromWho}).then(response => res.send('deleted friend and all his messages'))
  }).catch(err => res.send(err))
}

// This will delete the friend from your friend list, as well as all the messages that you have favorited by
// that user. This will work on clicking the friends name in the friends bar.
