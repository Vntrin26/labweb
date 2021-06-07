var express = require('express');
var router = express.Router();
usersService = require('../Services/users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//var userService = require('../../src/app/services/UserService');
/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.json({users: [{name: 'Timmy'}]});
//});
router.post('/authenticate', (req, res) => {
    usersService.authenticate(req.body, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if(data == undefined){
            res.status(401).send('Incorrect Password or User');
            return;
        }
        bcrypt.compare(req.body.password, data.Password, function(err, result) {
            //console.log(result);
            if (result == true) {
                data.token = jwt.sign({ sub: data.Username }, "secret");           
                res.send(data);
            } else {
                res.status(401).send('Incorrect Password or User');
            }
        });


    });
});
module.exports = router;
