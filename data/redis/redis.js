
//Middleware Function to Check Cache
function checkCache(req, res, next){
    const redisClient = req.app.locals.redis
    const key = req.path

    redisClient.get(key, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        
        if (data != null) {
            // Data exists. Return it from Redis
            res.send(JSON.parse(data))
        } 
        else {
            // No data found in Redis. Make a network call
            next()
        }
    })
}

module.exports = checkCache