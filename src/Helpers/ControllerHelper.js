const ApiResponse = require('./ApiResponse');
const ResponseStatus = require('./ResponseStatus');

class ControllerHelper {
    static handleApiResponse(res, result, status, message) {
        let statusCode;
        switch (status) {
            case ResponseStatus.Success:
                statusCode = 200;
                break;

            case ResponseStatus.Created:
                statusCode = 201;
                break;

            case ResponseStatus.Error:
                statusCode = 500;
                break;

            case ResponseStatus.NotFound:
                statusCode = 404;
                break;

            case ResponseStatus.Unauthorized:
                statusCode = 401;
                break;

            case ResponseStatus.Processing:
                statusCode = 102;
                break;

            case ResponseStatus.Accepted:
                statusCode = 202;
                break;

            case ResponseStatus.BadRequest:
                statusCode = 400;
                break;

            case ResponseStatus.Forbidden:
                statusCode = 403;
                break;

            default:
                statusCode = 500;
                message = 'An unexpected error occurred';
        }

        return res.status(statusCode).json(new ApiResponse(status, statusCode, message, result));
    }
}

module.exports = ControllerHelper;
