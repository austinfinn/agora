const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);
const expect = chai.expect

const create = require('./create')
const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')
const eh = require('../../utils/errorsHandler/errorsHandler')

describe('Route: /v1/users/create', () => {
    it('should save new user details to the database and Google Sheets doc', async () => {
        const request = {
            body:{
                email: "fake0001@email.com",
                password: "123pass",
                dateOfBirth: "1999-01-01",
                mothersMaidenName: "smith"
            }
        }
        const req = mockReq(request)
        const res = mockRes()

        const dbResult = [{ userId:"1001" }]

        const spyInsertQuery = sinon.spy(sql,'insertUser')
        const spySelectQuery = sinon.spy(sql,'selectUserIdByEmail')
        const stubMySql = sinon.stub(mySql,'executeQuery').onSecondCall().returns(dbResult)
        const stubSaveToSheets = sinon.stub(helper,'saveUserDetailsToGoogleSheets')

        await create(req, res)

        expect(res.send).to.be.calledWithExactly({
            message: "Success!! Your new user has been saved to the Database and Google Sheets doc."
        })

        sinon.assert.calledOnce(spyInsertQuery)
        sinon.assert.calledWith(spyInsertQuery, request.body.email, request.body.dateOfBirth)
        sinon.assert.calledOnce(spySelectQuery)
        sinon.assert.calledWith(spySelectQuery, request.body.email)
        sinon.assert.calledTwice(stubMySql)
        sinon.assert.calledOnce(stubSaveToSheets)
        sinon.assert.calledWith(stubSaveToSheets, dbResult[0].userId, request.body.password, request.body.mothersMaidenName)
        sinon.restore()
    })

    it('should display an error if a customer attempts to create a user with a duplicated email address', async () => {
        const err = {
            code:"ER_DUP_ENTRY"
        }
        const request = {
            body:{
                email: "fake0001@email.com",
                password: "123pass",
                dateOfBirth: "1999-01-01",
                mothersMaidenName: "smith"
            }
        }
        
        const req = mockReq(request)
        const res = mockRes()

        sinon.stub(mySql,'executeQuery').throws(err)
        
        await create(req, res)

        expect(res.send).to.be.calledWithExactly({
            message: "You have entered a duplicate email address!"
        })
        sinon.restore()
    })

    it('should display an error if a customer leaves the email address value blank', async () => {
        const request = {
            body:{
                email: "",
                password: "123pass",
                dateOfBirth: "1999-01-01",
                mothersMaidenName: "smith"
            }
        }
        const req = mockReq(request)
        const res = mockRes()
        
        await create(req, res)

        expect(res.send).to.be.calledWithExactly({
            message: "The email value is blank. Please enter a unique email address"
        })
        sinon.restore()
    })

    it('should display an meaningful error when a downstream/underlying network request fails', async () => {
        const err = {
            response:{
                status: 504,
                config:{
                    url: 'https://fake.bank.domain/cds-au/v0/banking/products',
                    method: 'get',
                    headers: { Accept: 'application/json, text/plain, */*' }
                },
                data:{ message:"I think something timed out!"}
            }
        }

        const request = {
            body:{
                email: "fake0001@email.com",
                password: "123pass",
                dateOfBirth: "1999-01-01",
                mothersMaidenName: "smith"
            }
        }
        
        const req = mockReq(request)
        const res = mockRes()

        const spyErrorsHandler = sinon.spy(eh,'errorsHandler')
        sinon.stub(mySql,'executeQuery').throws(err)
        
        await create(req, res)

        sinon.assert.calledOnce(spyErrorsHandler)
        sinon.assert.calledWith(spyErrorsHandler,err)
        sinon.restore()
    })
})