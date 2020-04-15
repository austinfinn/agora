const expect  = require('chai').expect;
const chai = require('chai')

const { getUserEmailsQuery } = require('./sqlQuery')

describe('Users SQL queries', () => {
    it(`should return the correct query for getUserEmailsQuery()`, () => {
        const resultWithExtraSpaces = getUserEmailsQuery()
        const result = resultWithExtraSpaces.replace(/\s\s+/g, ' ')

        expect(result).to.contain(`SELECT user_id, email FROM users;`)
    })
})