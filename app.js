const express = require('express')
const redis = require('redis')
const app = express()
let port = 4001
require('dotenv').config()
const routes = require('./src/routes')
app.use(routes)

console.log(" Starting port is: ", port)
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
    // set port
    app.listen(port, function () {
        console.log("Port from app.listen(): ", port)
        console.log("process.env.PORT is: ", process.env.PORT)
        if (process.env.PORT) {
            port = process.env.PORT
            console.log("Set the port if it is not set: ", port)
        }
        
        console.log("")
        console.log(`Agora app running on http://localhost:${port}`)
        console.log(`Redis is running on ${process.env.REDIS_HOST}`)
        console.log("")
    });
}, (error) => {
    console.error(`Unable to connect to Redis DB with error: `, error);
})