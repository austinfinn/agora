const axios = require('axios')

async function getRequest(url) {
    const options = {
        headers: { 
            'x-v': '1' 
        }
    }
    return await axios.get(url,options);   
}

module.exports = { getRequest }