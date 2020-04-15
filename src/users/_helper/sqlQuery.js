function getUserEmailsQuery(params) {
    return `SELECT user_id, email 
            FROM users;`
}

function insertUser(email, dateOfBirth){
    return `INSERT INTO users (email, date_of_birth)
            VALUES('${email}','${dateOfBirth}');`
}

function selectUserIdByEmail(email) {
    return `SELECT user_id 
            FROM users
            WHERE email='${email}';`
}
module.exports = { 
    getUserEmailsQuery, 
    insertUser
}