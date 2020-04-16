const express = require('express')
const redis = require('redis')
const app = express()
const port = 4001

const routes = require('./src/routes')
app.use(routes)

app.use(`/public`, express.static('public'))

const connectToRedis = () => {
    const client = redis.createClient("redis://localhost:6379")

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
        console.log(`Agora app running on http://localhost:${port}`)
        console.log(`Redis is running on redis://localhost:6379`)
        console.log("")
    });
}, (error) => {
    console.error(`Unable to connect to Redis DB with error: `, error);
})