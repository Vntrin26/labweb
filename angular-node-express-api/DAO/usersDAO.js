let dbConfig = require("../Utilities/mysqlConfig");



let getUserPW = (criteria, callback) => {
    //criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
    dbConfig.getDB().query("SELECT `Password`, `Email` FROM `user` WHERE `Username` = '"+criteria.Username+"'", callback);
}

let getUserDetails = (criteria, callback) => {
    let conditions = "";
    criteria.ID ? conditions += ` and id = '${criteria.ID}'` : true;
    dbConfig.getDB().query("SELECT * FROM `user` " + conditions, callback);
}

module.exports = {
    getUserPW: getUserPW,
    getUserDetails: getUserDetails
}