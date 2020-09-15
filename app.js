const express = require('express')
const redis = require('redis')
const app = express()
require('dotenv').config()
let port = ""

// set a variable to indicate the application is running locally or on Docker
global.localDevelopment = process.env.LOCAL_DEVELOPMENT

if (global.localDevelopment) {
    // hard code port so application runs locally or on Docker
    port = 4001
    global.localhost = `http://localhost:${process.env.PORT}`
} else {
    // set the port dynamically so application runs on Heroku
    port = process.env.PORT
}

const routes = require('./src/routes')
app.use(routes)
app.use(`/public`, express.static('public'))

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

    app.listen(port, function () {
        console.log("")
        console.log(`Agora app running on http://localhost:${port}`)
        console.log(`Redis is running on ${process.env.REDIS_HOST}`)
        console.log("")
    });
}, (error) => {
    console.error(`Unable to connect to Redis DB with error: `, error);
})