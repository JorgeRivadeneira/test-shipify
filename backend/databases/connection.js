import mySQL from 'mysql'
import mySQLCredentials  from "./credentials.js";

const mySQLConnection = mySQL.createConnection(mySQLCredentials);

mySQLConnection.connect((error) => {
    if(error){
        console.error('Ha ocurrido un error: ' + error);
        return;
    }
    console.log('...Connected to MySQL Server');
});

export default  mySQLConnection;