function errorsHandler(err){
    if(err.response.status){
        return networkErrorHandler(err)
    }
}

function networkErrorHandler(err){
    if(err.response.status == 403){
        // this is an example of how you could handle specific error status codes
        return networkErrorResponseFormatter(err, 403 ,"Check you have the correct level of priviledges to make this Request")
    } else {
        return networkErrorResponseFormatter(err, err.response.status ,"An unhandled error occured. Feel free to create a PR to fix it!")
    }
}

function networkErrorResponseFormatter(err, customStatus, customMessage){
    const {status, config, data } = err.response
    return {
        statusCode: customStatus,
        body: {
            message : customMessage,
            summary: {
                url: config.url,
                statusCode: status,
                resposeBody: data
            },
            details: config
        }
    }
}

module.exports = { errorsHandler }