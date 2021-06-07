let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    projectService = require('../Services/project');
    var protecc = require('./routeProtect');

/**Api to create project */
router.post('/create-project', protecc, (req, res) => {
    projectService.createProject(req.body, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// /**Api to update project */
router.put('/update-project', protecc, (req, res) => {
    projectService.updateProject(req.body, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// /**Api to delete the project */
router.delete('/delete-project', protecc, (req, res) => {
    projectService.deleteProject(req.query, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

/**Api to get the list of project */
router.get('/get-project',protecc, (req, res) => {
    projectService.getProject(req.query, (data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// /**API to get the project by id... */
router.get('/get-project-by-id', protecc, (req, res) => {
    projectService.getProjectById(req.query, (data) => {
        res.send(data);
    });
});

module.exports = router;