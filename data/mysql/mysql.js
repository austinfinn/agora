var mysql = require('mysql');

//connection configurations
const dbConn = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    database: 'agora_1',
    user: 'root',
    password:'password'
});

dbConn.getConnection((err, connection) => {
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