let async = require('async'),
    parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
    projectDAO = require('../DAO/projectDAO');
//config = require("../Utilities/config").config;


/**API to create the atricle */
let createProject = (data, callback) => {
    async.auto({
        project: (cb) => {
            console.log(data);
                var dataToSet = {
                    "ID": data.ID,
                    "Name": data.Name,
                    "finishdate": data.finishdate
                }
                projectDAO.createProject(dataToSet, (err, data) => {
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                        return;
                    }
                    cb(null, data);
                    return;
                });
            }
            //]
    }, (err, response) => {
        callback(response.project);
    });
}

/**API to update the project */
let updateProject = (data, callback) => {
    async.auto({
        projectUpdate: (cb) => {
            if (!data.id) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                id: data.id,
            }
            var dataToSet = {
                "ID": data.id,
                "Name": data.Name,
                "finishdate": data.finishdate
            }
            console.log(criteria, 'test', dataToSet);
            projectDAO.updateProject(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED, "result": dataToSet });
                }
            });
        }
    }, (err, response) => {
        callback(response.projectUpdate);
    });
}

/**API to delete the subject */
let deleteProject = (data, callback) => {
    async.auto({
        removeProject: (cb) => {
            if (!data.ID) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                id: data.ID,
            }
            projectDAO.deleteProject(criteria, (err, dbData) => {
                if (err) {
                    console.log(err);
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });
            });
        }
    }, (err, response) => {
        callback(response.removeProject);
    });
}

/***API to get the project list */
let getProject = (data, callback) => {
    async.auto({
        project: (cb) => {
            projectDAO.getProject({}, (err, data) => {
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
        console.log(response);
        callback(response.project);

    })
}

/***API to get the project detail by id */
let getProjectById = (data, callback) => {
    async.auto({
        project: (cb) => {
            let criteria = {
                "ID": data.ID
            }
            projectDAO.getProjectDetail(criteria, (err, data) => {
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
        callback(response.project);
    })
}

module.exports = {
    createProject: createProject,
    updateProject: updateProject,
    deleteProject: deleteProject,
    getProject: getProject,
    getProjectById: getProjectById
};