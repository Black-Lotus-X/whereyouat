let users = {};
let keyNum = 0;

//randomQueue is an array of the user userKeys of those waiting to join a random chat.
//We decided not to connect pairs of people randomly but the commented functions work.
//socket.io functionality connecting 2 users was not implemented
//let randomQueue = [];
//let roomNum = 0;

//Adds a new user to the users object with the longitude and latitude
//Commented lines also add that user to the randomQueue and set room to -1,
// indicating the user does not have a room yet.
exports.joinRandom = (req, res) => {
    console.log('REGISTERRING');
    let userKey = ++keyNum;
    users[userKey] = req.body;
    //randomQueue.push(userKey);
    //users[userKey].room = -1;
    res.status(200).send();
    //res.send({keyNum: userKey});
}

//get center returns the coordinates at the center of all users in the chat
exports.getCenter = (req,res) => {
    let totalLat = 0;
    let totalLong = 0;
    let totalUsers = 0;
    for (let user in users) {
        if (users[user].longitude && users[user].latitude) {
            totalLat += users[user].latitude;
            totalLong += users[user].longitude;
            totalUsers++;
        }
    }
    if (totalUsers > 0) {
        res.status(200).send({latitude: totalLat/totalUsers, longitude: totalLong/totalUsers});
    } else {
        res.status(404).send();
    }
}

//Join room takes the userKey of the usr performing the request:
//If the user has not been matched, matches the user with another user in
//randomQueue if there is one, sets room number of both users in users object,
//returns the room number to the user. If there is no match, returns status 4-4
//If the user has already been placed in a room, returns that room.
// exports.joinRoom = (req, res) => {
//     let joiningNum = req.body.keyNum;
//     let matchedNum = 0;
//     if (users[joiningNum]) {
//         console.log('has user');
//         if (users[joiningNum].room === -1 && randomQueue.length > 1) {
//             console.log('should be a match');
//             for (let i = 0; i < randomQueue.length; i++) {
//                 if (randomQueue[i] !== joiningNum) {
//                     matchedNum = randomQueue[i];
//                     randomQueue.splice(i, 1);
//                     break;
//                 }
//             }
//             for (let i = 0; i < randomQueue.length; i++) {
//                 if (randomQueue[i] === matchedNum) {
//                     randomQueue.splice(i, 1);
//                     break;
//                 }
//             }
//             console.log('matchedNum:', matchedNum);
//             console.log('joiningNum:', joiningNum);
//             let room = roomNum++;
//             users[joiningNum].room = room;
//             users[matchedNum].room = room;
//             res.send({room: room});
//         } else if (users[joiningNum].room >= 0) {
//             res.send({room: users[joiningNum].room});
//             console.log('already has room')
//         } else {
//             res.send({room: -1});
//             console.log('no match found')
//         }
        
//     }
//     res.status(404).send();
// }

//removes the user from the users object based on the users lat/long coordinates
exports.disconnect = (req, res) => {
    let userKeys = Object.keys(users);
    for (let i = 0; i < userKeys.length; i++) {

        if (users[userKeys[i]].latitude === req.body.latitude && users[userKeys[i]].longitude === req.body.longitude) {
            delete users[userKeys[i]];
            break;
        }
    }
    res.status(200).send();

    //Disconnect function if randomQueue is enabled
    // let disconnectingKey = req.body.keyNum;
    // for (let i = 0; i < randomQueue.length; i++) {
    //     if (randomQueue[i] === disconnectingKey) {
    //         randomQueue.splice(i, 1);
    //         break;
    //     }
    // }
    // delete users[disconnectingKey];

}