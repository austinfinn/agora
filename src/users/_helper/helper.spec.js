const expect  = require('chai').expect;
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const { getCredentials, saveUserDetailsToGoogleSheets } = require('./helper')
const googlesheets = require('../../../data/googlesheets/googlesheet')

// create a fake functions to make testing/stubbing easier
function getRows() {}
function addRow() {}

describe('getCredentials()', () => {
    const dbUsers = [ 
        { user_id: 1, email: 'john@fake.com' },
        { user_id: 2, email: 'claire@fake.com' },
        { user_id: 3, email: 'thomas@fake.com' } 
    ]
    
    it(`should return login credentails when matching records are found in both the database and the Google sheets doc`, async () => {
        const sheetsUsers = [ 
            { userId: '2', password: 'abc123def' },
            { userId: '4', password: '000xyz' }
        ]
        const sheet = { getRows }
        const stubWorksheetData = sinon.stub(googlesheets,'getWorksheetData').returns(sheet)
        const stubRows = sinon.stub(sheet,'getRows').returns(sheetsUsers)

        const result = await getCredentials(dbUsers)

        expect(result).to.deep.equal([{
            email: 'claire@fake.com',
            password: 'abc123def'
        }])

        sinon.assert.calledOnce(stubWorksheetData)
        sinon.assert.calledWith(stubWorksheetData, 0)
        sinon.assert.calledOnce(stubRows)
        sinon.restore()
    })

    it(`should return an empty array when there were 0 matching records`, async () => {
        const sheetsUsers = [ 
            { userId: '5', password: 'myFakePassword' },
            { userId: '6', password: 'abcde12345' }
        ]

        const sheet = { getRows }
        const stubWorksheetData = sinon.stub(googlesheets,'getWorksheetData').returns(sheet)
        const stubRows = sinon.stub(sheet,'getRows').returns(sheetsUsers)

        const result = await getCredentials(dbUsers)

        expect(result).to.deep.equal([])

        sinon.assert.calledOnce(stubWorksheetData)
        sinon.assert.calledWith(stubWorksheetData, 0)
        sinon.assert.calledOnce(stubRows)
        sinon.restore()
    })
})

describe('saveUserDetailsToGoogleSheets()', () => {
    it(`should save the users details to the Google Sheets doc`, async () => {
        const userId = "123456"
        const password = "pass1234"
        const mothersMaidenName = "dad"

        const sheet = { addRow }
        const stubWorksheetData = sinon.stub(googlesheets,'getWorksheetData').returns(sheet)
        const stubAddRows = sinon.stub(sheet,'addRow')

        await saveUserDetailsToGoogleSheets(userId, password, mothersMaidenName)

        sinon.assert.calledOnce(stubWorksheetData)
        sinon.assert.calledWith(stubWorksheetData, 0)
        sinon.assert.calledOnce(stubAddRows)
    })
})