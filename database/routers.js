let router = require('express').Router()
let controllers = require('./controllers.js')

router.route('/')
  .post(controllers.saveUser)
  .get(controllers.getUsers)

// This route allows you to retrieve all the users that are currently registered, as well as saving a new user.

router.route('/:username')
  .get(controllers.retrieveUser)
  .delete(controllers.deleteAllMessages)

// This route allows you to retrieve a user by username and delete all the messages by that username.
// Deleting all messages has not been implemented, so its a good place to start.

router.route('/:username/friends')
  .get(controllers.retrieveFriends)
  .post(controllers.saveFriend)
  .delete(controllers.deleteFriend)

// This route allows you to retrieve all friends by a specific username. It also lets you save a friend as
// well as delete a friend by that username.

router.route('/:username/messages')
  .get(controllers.retrieveAllMessages)
  .post(controllers.saveMessage)
  .delete(controllers.deleteMessage)

// This route allows you to retrieve all the messages saved by the user. It also lets you save a message
// by username, as well as delete a message by username, which has not yet been implemented.

module.exports = router
