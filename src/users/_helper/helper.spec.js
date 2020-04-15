const expect  = require('chai').expect;
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const { getLoginCredentials } = require('./helper')
const googlesheets = require('../../../data/googlesheets/googlesheet')

describe('getLoginCredentials()', () => {
    const dbUsers = [ 
        { user_id: 1, email: 'john@fake.com' },
        { user_id: 2, email: 'claire@fake.com' },
        { user_id: 3, email: 'thomas@fake.com' } 
    ]
    // create a fake 'getRows' function so it's response can be stubbed
    function getRows() {}

    it(`should return login credentails when matching records are found in both the database and the Google sheets doc`, async () => {
        const sheetsUsers = [ 
            { user_id: '2', password: 'abc123def' },
            { user_id: '4', password: '000xyz' }
        ]
        const sheet = { getRows }
        const stubWorksheetData = sinon.stub(googlesheets,'getWorksheetData').returns(sheet)
        const stubRows = sinon.stub(sheet,'getRows').returns(sheetsUsers)

        const result = await getLoginCredentials(dbUsers)

        expect(result).to.deep.equal([{
            email: 'claire@fake.com',
            password: 'abc123def'
        }])

        sinon.assert.calledOnce(stubWorksheetData)
        sinon.assert.calledWith(stubWorksheetData, 0)
        sinon.assert.calledOnce(stubRows)
        sinon.restore()
    })

    it(`should should return an empty array when there were 0 matching records`, async () => {
        const sheetsUsers = [ 
            { user_id: '5', password: 'myFakePassword' },
            { user_id: '6', password: 'abcde12345' }
        ]

        const sheet = { getRows }
        const stubWorksheetData = sinon.stub(googlesheets,'getWorksheetData').returns(sheet)
        const stubRows = sinon.stub(sheet,'getRows').returns(sheetsUsers)

        const result = await getLoginCredentials(dbUsers)

        expect(result).to.deep.equal([])

        sinon.assert.calledOnce(stubWorksheetData)
        sinon.assert.calledWith(stubWorksheetData, 0)
        sinon.assert.calledOnce(stubRows)
        sinon.restore()
    })
})