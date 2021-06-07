let async = require('async'),
    parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
usersDAO = require('../DAO/usersDAO');

let authenticate = (data, callback) => {
    async.auto({
        case: (cb) => {
            let criteria = {
                "Username": data.username
            }
            console.log(data);
            usersDAO.getUserPW(criteria, (err, data) => {
                if (err) {
                    console.log(err)
                    cb(null, { "errorCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                }
                cb(null, data);
                return;
            });
        }
    }, (err, response) => {    

        let usrData = JSON.parse(JSON.stringify(response.case))[0];
        callback(usrData);
    })
}
module.exports = {
    authenticate: authenticate
}