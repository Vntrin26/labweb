let async = require('async'),
    parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
    taskDAO = require('../DAO/taskDAO');
//config = require("../Utilities/config").config;


/**API to create the atricle */
let createTask = (data, callback) => {
    async.auto({
        task: (cb) => {
            console.log(data);
                var dataToSet = {
                    "ID": data.ID,
                    "Task": data.Task,
                    "Project": data.Project? data.Project : '',
                    "description": data.description,
                    "Finished": "No",
                    "finishdate": data.date
                }
                taskDAO.createTask(dataToSet, (err, data) => {
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
        callback(response.task);
    });
}

/**API to update the task */
let updateTask = (data, callback) => {
    async.auto({
        taskUpdate: (cb) => {
            if (!data.id) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                id: data.id,
            }
            var dataToSet = {
                "ID": data.id,
                "Task": data.Task,
                "Project": data.Project? data.Project : '',
                "description": data.description,
                "Finished": data.Finished,
                "Date": data.date
            }
            console.log(criteria, 'test', dataToSet);
            taskDAO.updateTask(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED, "result": dataToSet });
                }
            });
        }
    }, (err, response) => {
        callback(response.taskUpdate);
    });
}

/**API to delete the subject */
let deleteTask = (data, callback) => {
    async.auto({
        removeTask: (cb) => {
            if (!data.ID) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                id: data.ID,
            }
            taskDAO.deleteTask(criteria, (err, dbData) => {
                if (err) {
                    console.log(err);
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });
            });
        }
    }, (err, response) => {
        callback(response.removeTask);
    });
}

/***API to get the task list */
let getTask = (data, callback) => {
    async.auto({
        task: (cb) => {
            taskDAO.getTask({}, (err, data) => {
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
        callback(response.task);

    })
}

/***API to get the task detail by id */
let getTaskById = (data, callback) => {
    async.auto({
        task: (cb) => {
            let criteria = {
                "ID": data.ID
            }
            taskDAO.getTaskDetail(criteria, (err, data) => {
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
        callback(response.task);
    })
}

module.exports = {
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    getTask: getTask,
    getTaskById: getTaskById
};