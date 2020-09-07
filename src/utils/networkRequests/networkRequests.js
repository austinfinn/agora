const axios = require('axios')
const utils = require('../utils')

async function getRequest(url) {
    const options = {
        headers: { 
            'x-v': utils.getMinimumSupportedVersion(url) 
        }
    }
    return await axios.get(url,options)
}

module.exports = { getRequest }