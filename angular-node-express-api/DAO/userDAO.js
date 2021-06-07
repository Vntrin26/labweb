let dbConfig = require("../Utilities/mysqlConfig");



let getUser= (criteria, callback) => {
    //criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
    dbConfig.getDB().query("SELECT * FROM `user`", callback);
}

let getUserDetail = (criteria, callback) => {
    let conditions = "";
    criteria.ID ? conditions += ` and id = '${criteria.ID}'` : true;
    dbConfig.getDB().query("SELECT * FROM `user` " + conditions, callback);
}

let createUser = (dataToSet, callback) => {
    console.log("insert into User set ? ", dataToSet)
    dbConfig.getDB().query("INSERT INTO `user`  ( `Username`, `Password`, `Email`)  VALUES ('"+dataToSet.Username+"','"+dataToSet.Password+"', '"+dataToSet.Email+"');", callback);
    //console.log("INSERT INTO `User` (`id`, `Username`, `User`, `Password`) VALUES ("+dataToSet.ID+","+dataToSet.Username+","+dataToSet.User+", "+dataToSet.Password+");");
}
    

let deleteUser = (criteria, callback) => {
    let conditions = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    console.log("delete from `user` where " + conditions);
    dbConfig.getDB().query("delete from `User` where " + conditions, callback);
    //dbConfig.getDB().query("DELETE FROM `User` (`id`, `Username`, `User`, `Password`) VALUES ('"+dataToSet.ID+"','"+dataToSet.Username+"','"+dataToSet.User+"', '"+dataToSet.Password+"');", callback);

}

let updateUser = (criteria, dataToSet, callback) => {
    let conditions = "";
    let setData = "";
    let id = criteria.id;
    criteria.id ? conditions += ` and ID = '${criteria.id}'` : true;
    dataToSet.Username ? setData += `Username = '${dataToSet.Username}'` : true;
    dataToSet.User ? setData += `, User = '${dataToSet.Email}'` : true;
    dataToSet.Password ? setData += `, Password = '${dataToSet.Password}'` : true;
    //console.log(`UPDATE User SET Username= ${dataToSet.Username},User= ${dataToSet.User}, Password=${dataToSet.Password}  WHERE id = ${id} `);
    dbConfig.getDB().query("UPDATE `User` SET `Username`= '"+dataToSet.Username+"',`Email`= '"+dataToSet.Email+"',`Password`='"+dataToSet.Password+"' WHERE id = "+id+"" , callback);
}
let deactivateUser = (criteria, callback) => {
    let id = criteria.id;
    //console.log(`UPDATE User SET Username= ${dataToSet.Username},User= ${dataToSet.User}, Password=${dataToSet.Password}  WHERE id = ${id} `);
    dbConfig.getDB().query("UPDATE `User` SET `isActive`= '0' WHERE id = "+id+"" , callback);
}
module.exports = {
    getUser: getUser,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getUserDetail: getUserDetail,
    deactivateUser: deactivateUser
}