var mysql = require('mysql')
require('dotenv').config()

//connection configurations
const dbConn = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

dbConn.getConnection((err, connection) => {
    console.log("The error from the MySQL module is ------> ", err)
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        if(err.code === "PROTOCOL_SEQUENCE_TIMEOUT"){
            console.error('Database connection timed out.')
        }
        if(err.code === "ETIMEDOUT"){
            console.error('Connecting to the database has timed out')
        }
    }
    if (connection) connection.release()
    return
})

async function executeQuery(sqlString){
    return await new Promise(function(resolve, reject) {
        dbConn.query(sqlString, function (error, results) {
            if (error) {
                reject(error);
            }
            resolve(results)
        });
    }); 
}

module.exports = { executeQuery };