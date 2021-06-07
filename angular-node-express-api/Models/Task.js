let mysqlConfig = require("../Utilities/mysqlConfig");

let initialize = () => {
    mysqlConfig.getDB().query("CREATE TABLE IF NOT EXISTS `task` (`id` INT NOT NULL, `Project` VARCHAR(45) NOT NULL, `task` VARCHAR(45) NOT NULL,`description` VARCHAR(45) NOT NULL, `Finished` VARCHAR(45) NOT NULL, `finishdate` DATE NOT NULL, PRIMARY KEY(`id`));");
    mysqlConfig.getDB().query("ALTER TABLE `task` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;");
}

module.exports = {
    initialize: initialize
}