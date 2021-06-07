let dbConfig = require("../Utilities/mysqlConfig");



let getProject = (criteria, callback) => {
    //criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
    dbConfig.getDB().query("SELECT * FROM `project`", criteria, callback);
}

let getProjectDetail = (criteria, callback) => {
    let conditions = "";
    criteria.ID ? conditions += ` and id = '${criteria.ID}'` : true;
    dbConfig.getDB().query("SELECT * FROM `project` " + conditions, callback);
}

let createProject = (dataToSet, callback) => {
    dbConfig.getDB().query("INSERT INTO `project` (`Name`, `finishdate`) VALUES ('"+dataToSet.Name+"','"+dataToSet.finishdate+"');", callback);
}

let deleteProject = (criteria, callback) => {
    let conditions = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    console.log("delete from `project` where " + conditions);
    dbConfig.getDB().query("delete from `project` where " + conditions, callback);

}

let updateProject = (criteria, dataToSet, callback) => {
    let conditions = "";
    let setData = "";
    let id = criteria.id;
    criteria.id ? conditions += ` and ID = '${criteria.id}'` : true;
    dataToSet.Name ? setData += `, project = '${dataToSet.Name}'` : true;
    dataToSet.finishdate ? setData += `, description = '${dataToSet.finishdate}'` : true;
    dbConfig.getDB().query("UPDATE `project` SET `Name`= '"+dataToSet.Name+"', `finishDate`= '"+dataToSet.finishdate+"' WHERE id = "+id+"" , callback);
}
module.exports = {
    getProject: getProject,
    createProject: createProject,
    deleteProject: deleteProject,
    updateProject: updateProject,
    getProjectDetail: getProjectDetail
}