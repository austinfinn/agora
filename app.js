const express = require('express')
const app = express()
const port = 4001

const routes = require('./src/routes')
app.use(routes)

app.use(`/public`, express.static('public'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))