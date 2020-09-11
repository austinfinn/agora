const express = require('express')
const redis = require('redis')
const app = express()
let port = process.env.PORT || 4001
require('dotenv').config()
const routes = require('./src/routes')
app.use(routes)

app.use(`/public`, express.static('public'))

// set a global variable to indicate the application is running locally
global.localDevelopment = process.env.LOCAL_DEVELOPMENT
if (global.localDevelopment) {
    global.localhost = `http://localhost:${port}`
}

console.log(" The port is ", port)
console.log(" global.localDevelopment ", global.localDevelopment)
console.log(" GOOGLE_SERVICE_ACCOUNT_EMAIL : ", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
console.log(" GOOGLE_PRIVATE_KEY           : ", process.env.GOOGLE_PRIVATE_KEY)
console.log(" GOOGLE_SHEET_ID              : ", process.env.GOOGLE_SHEET_ID)
console.log(" ")

const connectToRedis = () => {
    const client = redis.createClient(process.env.REDIS_HOST)

    return new Promise((resolve, reject) => {
        client.on('connect', () => {
            resolve(client)
        });
        client.on('error', (err) => {
            reject(err)
        })
    })
}

connectToRedis().then((client) => {
    app.locals.redis = client;
    // set port
    app.listen(port, function () {
        console.log("")
        console.log(`Agora app running on http://localhost:${port}/v1/docs/`)
        console.log(`Redis is running on ${process.env.REDIS_HOST}`)
        console.log("")
    });
}, (error) => {
    console.error(`Unable to connect to Redis DB with error: `, error);
})