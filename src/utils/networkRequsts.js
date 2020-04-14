const axios = require('axios')

async function getRequest(url) {
    const options = {
        method: 'get',
        url: url,
        headers: { 
            'x-v': '1' 
        }
    }
    return await axios(options);   
}

module.exports = { getRequest }