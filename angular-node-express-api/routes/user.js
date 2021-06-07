let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    userService = require('../Services/user');
    var protecc = require('./routeProtect');

/**Api to create user */
router.post('/create-user', (req, res) => {
    userService.createUser(req.body, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// /**Api to update user */
router.put('/update-user', protecc, (req, res) => {
    userService.updateUser(req.body, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// /**Api to delete the user */
router.delete('/delete-user', protecc, (req, res) => {
    userService.deleteUser(req.query, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

/**Api to get the list of user */
router.get('/get-user', protecc, (req, res) => { 
    userService.getUser(req.query, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});
router.put('/deactivate-user', protecc, (req, res) => {
    userService.deactivateUser(req, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});


// /**API to get the user by id... */
router.get('/get-user-by-id', protecc, (req, res) => {
    userService.getUserById(req.query, (data) => {
        res.send(data);
    });
});


module.exports = router;