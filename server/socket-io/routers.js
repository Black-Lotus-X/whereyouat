let router = require('express').Router();
let controllers = require('./controllers');

//routes for /chat

router.route('/')
.post(controllers.joinRandom)
.get(controllers.getCenter);

//routes related to unused random matching
// router.route('/join')
// .post(controllers.joinRoom);

router.route('/leave')
.post(controllers.disconnect);

module.exports = router;