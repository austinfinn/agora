const expect  = require('chai').expect;
const chai = require('chai')

const sql = require('./sqlQuery')

describe('Users SQL queries', () => {
    const email = "fake@email.com"
    it(`should return the correct query for selectEmailAndUserId()`, () => {
        const resultWithExtraSpaces = sql.selectEmailAndUserId()
        const result = resultWithExtraSpaces.replace(/\s\s+/g, ' ')

        expect(result).to.contain(`SELECT user_id, email FROM users;`)
    })

    it(`should return the correct query for insertUser()`, () => {
        const dateOfBirth="1999-12-31"

        const resultWithExtraSpaces = sql.insertUser(email, dateOfBirth)
        const result = resultWithExtraSpaces.replace(/\s\s+/g, ' ')

        expect(result).to.contain(`INSERT INTO users (email, date_of_birth) VALUES('fake@email.com','1999-12-31');`)
    })

    it(`should return the correct query for selectUserIdByEmail()`, () => {
        const resultWithExtraSpaces = sql.selectUserIdByEmail(email)
        const result = resultWithExtraSpaces.replace(/\s\s+/g, ' ')

        expect(result).to.contain(`SELECT user_id as userId FROM users WHERE email='fake@email.com';`)
    })
})