const statusMessagges = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
}

exports.success = function(req, res, messagge, status) {
    let statusCode = status;
    let statusMessagges = messagge;
    if (!status) {
        status = 200;
    }
    if (!messagge) {
        statusMessagge = statusMessagges[status];
    }
    res.status(statusCode).send({
        error: 'No errors',
        body: statusMessagge
    });
}

exports.error = function(req, res, messagge, status) {
    res.status(status || 500).send({
        error: messagge,
        body: 'No body'
    });
}