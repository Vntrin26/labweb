let async = require('async'),
    parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
    userDAO = require('../DAO/userDAO');
    var bcrypt = require('bcrypt');
const saltRounds = 10;
//config = require("../Utilities/config").config;


/**API to create the atricle */
let createUser = (data, callback) => {
    async.auto({
        User: (cb) => {
                bcrypt.hash(data.Password, saltRounds, function(err, hash) {
                    var dataToSet = {
                        "ID": data.ID,
                        "Username": data.Username,
                        "Password": hash,
                        "Email": data.Email
                    }

                userDAO.createUser(dataToSet, (err, data) => {
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                        return;
                    }
                    cb(null, data);
                    return;
                });  
            });
            }
            //]
    }, (err, response) => {
        callback(response.User);
    });
}

/**API to update the User */
let updateUser = (data, callback) => {
    async.auto({
        userUpdate: (cb) => {
            if (!data.id) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                id: data.id,
            }
            bcrypt.hash(data.Password, saltRounds, function(err, hash){
            var dataToSet = {
                "ID": data.id,
                "Username": data.Username,
                "Password": hash,
                "Email": data.Email
            }
            console.log(criteria, 'test', dataToSet);
            userDAO.updateUser(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED, "result": dataToSet });
                }
            });
        });
        }
    }, (err, response) => {
        callback(response.userUpdate);
    });
}


/**API to delete the subject */
let deleteUser = (data, callback) => {
    console.log(data, 'data to set')
    async.auto({
        removeUser: (cb) => {
            if (!data.ID) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                id: data.ID
            }
            userDAO.deleteUser(criteria, (err, dbData) => {
                if (err) {
                    console.log(err);
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });
            });
        }
    }, (err, response) => {
        callback(response.removeUser);
    });
}

/***API to get the User list */
let getUser = (data, callback) => {
    async.auto({
        User: (cb) => {
            userDAO.getUser({}, (err, data) => {
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
        callback(response.User);
    })
}

/***API to get the User detail by id */
let getUserById = (data, callback) => {
    async.auto({
        User: (cb) => {
            let criteria = {
                "ID": data.ID
            }
            userDAO.getUserDetail(criteria, (err, data) => {
                if (err) {
                    console.log(err, 'error----');
                    cb(null, { "errorCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                }
                cb(null, data[0]);
                return;
            });
        }
    }, (err, response) => {
        callback(response.User);
    })
}

module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUser: getUser,
    getUserById: getUserById
};