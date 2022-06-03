import {Sequelize} from "sequelize";
import mySQLCredentials  from "./credentials.js";

// const conecction = Connection.createConnection(mySQLCredentials);

const db = new Sequelize(mySQLCredentials.database, mySQLCredentials.user, 
    mySQLCredentials.password, {
        host: mySQLCredentials.host,
        dialect: 'mysql'
    });

export default db;    