function errorsHandler(err){
    if (err.sqlMessage){
        return databaseErrorHandler(err)
    } else if(err.response.status){
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

function databaseErrorHandler(err){
    if(err.code == "ER_ACCESS_DENIED_ERROR"){
        // this is an example of how you could handle specific db errors
        return databaseErrorResponseFormatter(500 ,"Looks like the database credentials are incorrect.")
    } else {
        return databaseErrorResponseFormatter(500 ,"An unhandled error occured. Feel free to create a PR to fix it!")
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

function databaseErrorResponseFormatter(customStatus, customMessage) {
    return {
        statusCode: customStatus,
        body: {
            message : customMessage
        }
    }
}

module.exports = { errorsHandler }