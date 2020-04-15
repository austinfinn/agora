function getUserEmailsQuery(params) {
    return `SELECT user_id, email 
            FROM users;`
}

module.exports = { getUserEmailsQuery }