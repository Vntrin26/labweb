let mysqlConfig = require("../Utilities/mysqlConfig");

let initialize = () => {
    mysqlConfig.getDB().query("CREATE TABLE IF NOT EXISTS `user` (`id` INT NOT NULL, `Username` VARCHAR(45) NOT NULL, `Password` VARCHAR(100) NOT NULL,`Email` VARCHAR(45) NOT NULL, PRIMARY KEY(`id`));");
    mysqlConfig.getDB().query("ALTER TABLE `user` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;");
}

module.exports = {
    initialize: initialize
}