const ApiResponse = require('./ApiResponse');
const ResponseStatus = require('./ResponseStatus');

class ControllerHelper {
    static handleApiResponse(res, response) {
        switch (response.status) {
            case ResponseStatus.Success:
                return res.status(200).json(new ApiResponse('Success', 200, response.message, response.result));

            case ResponseStatus.Created:
                return res.status(201).json(new ApiResponse('Created', 201, response.message, response.result));

            case ResponseStatus.Error:
                return res.status(500).json(new ApiResponse('Error', 500, response.message, response.result));

            case ResponseStatus.NotFound:
                return res.status(404).json(new ApiResponse('Not Found', 404, response.message));

            case ResponseStatus.Unauthorized:
                return res.status(401).json(new ApiResponse('Unauthorized', 401, response.message));

            case ResponseStatus.Processing:
                return res.status(102).json(new ApiResponse('Processing', 102, response.message, response.result));

            case ResponseStatus.Accepted:
                return res.status(202).json(new ApiResponse('Accepted', 202, response.message, response.result));

            case ResponseStatus.BadRequest:
                return res.status(400).json(new ApiResponse('Bad Request', 400, response.message));

            case ResponseStatus.Forbidden:
                return res.status(403).json(new ApiResponse('Forbidden', 403, response.message));

            default:
                return res.status(500).json(new ApiResponse('Internal Server Error', 500, 'An unexpected error occurred'));
        }
    }
}

module.exports = ControllerHelper;
