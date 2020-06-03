const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect

const google = require('google-spreadsheet');
const { getWorksheetData } = require('./googlesheet')

describe('Google Sheets: getWorksheetData()', () => {
    it('should spy on all functions to ensure the app can successfully get the contents from a Google Sheets worksheet', async () => {
        const index = 0
        async function loadInfo() {}
        async function useServiceAccountAuth() {}

        const doc = {
            loadInfo,
            useServiceAccountAuth,
            sheetsByIndex:['abc','123']
        }
        
        const stubGoogleSheets = sinon.stub(google,'GoogleSpreadsheet').returns(doc)
        const stubDocUseServiceAccountAuth = sinon.stub(doc,'useServiceAccountAuth')
        const stubDocLoadInfo = sinon.stub(doc,'loadInfo')

        const result = await getWorksheetData(index)

        expect(result).to.equal(doc.sheetsByIndex[index])

        sinon.assert.calledOnce(stubGoogleSheets)
        sinon.assert.calledOnce(stubDocUseServiceAccountAuth)
        sinon.assert.calledOnce(stubDocLoadInfo)
    })
})