const axios = require('axios')

async function getRequest(url) {
    const options = {
        headers: { 
            'x-v': '1' 
        }
    }
    const { data } = await axios.get(url,options)
    return data
}

module.exports = { getRequest }