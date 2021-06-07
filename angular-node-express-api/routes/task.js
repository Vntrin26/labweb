let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    taskService = require('../Services/task');
    var protecc = require('./routeProtect');

/**Api to create task */
router.post('/create-task', protecc, (req, res) => {
    taskService.createTask(req.body, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// /**Api to update task */
router.put('/update-task', protecc, (req, res) => {
    taskService.updateTask(req.body, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// /**Api to delete the task */
router.delete('/delete-task', protecc, (req, res) => {
    taskService.deleteTask(req.query, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

/**Api to get the list of task */
router.get('/get-task',protecc, (req, res) => {
    taskService.getTask(req.query, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// /**API to get the task by id... */
router.get('/get-task-by-id', protecc, (req, res) => {
    taskService.getTaskById(req.query, (data) => {
        res.send(data);
    });
});

module.exports = router;