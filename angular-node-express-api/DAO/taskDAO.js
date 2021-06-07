let dbConfig = require("../Utilities/mysqlConfig");



let getTask = (criteria, callback) => {
    //criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
    dbConfig.getDB().query("SELECT * FROM `task`", criteria, callback);
}

let getTaskDetail = (criteria, callback) => {
    let conditions = "";
    criteria.ID ? conditions += ` and id = '${criteria.ID}'` : true;
    dbConfig.getDB().query("SELECT * FROM `task` " + conditions, callback);
}

let createTask = (dataToSet, callback) => {
    dbConfig.getDB().query("INSERT INTO `task` (`Project`, `task`, `description`, `Finished`, `finishDate`) VALUES ('"+dataToSet.Project+"','"+dataToSet.Task+"', '"+dataToSet.description+"', '"+dataToSet.Finished+"', '"+dataToSet.finishdate+"');", callback);
}

let deleteTask = (criteria, callback) => {
    let conditions = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    console.log("delete from `task` where " + conditions);
    dbConfig.getDB().query("delete from `task` where " + conditions, callback);

}

let updateTask = (criteria, dataToSet, callback) => {
    let conditions = "";
    let setData = "";
    let id = criteria.id;
    criteria.id ? conditions += ` and ID = '${criteria.id}'` : true;
    dataToSet.Project ? setData += `Project = '${dataToSet.Project}'` : true;
    dataToSet.Task ? setData += `, Task = '${dataToSet.Task}'` : true;
    dataToSet.description ? setData += `, description = '${dataToSet.description}'` : true;
    dataToSet.date ? setData += `, description = '${dataToSet.date}'` : true;
    console.log(`UPDATE task SET Project= ${dataToSet.Project},task= ${dataToSet.Task}, description=${dataToSet.description}  WHERE id = ${id} `);
    dbConfig.getDB().query("UPDATE `task` SET `Project`= '"+dataToSet.Project+"',`task`= '"+dataToSet.Task+"',`description`='"+dataToSet.description+"', `Finished`= '"+dataToSet.Finished+"', `finishDate`= '"+dataToSet.date+"' WHERE id = "+id+"" , callback);
}
module.exports = {
    getTask: getTask,
    createTask: createTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
    getTaskDetail: getTaskDetail
}