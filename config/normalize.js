let Response = require('./responseManager');
let {HttpStatus} = require('./constants')

exports.normalizeFields = (data, fields) => {
	fields.forEach(field => {
		data[field] = null;
		delete(data[field])
	})

	return data
}

exports.parseError = (res, error, message) => {
	return error.message ? Response.failure(res, {message: error.message}, HttpStatus.BAD_REQUEST)
		: Response.failure(res, {message: message}, HttpStatus.INTERNAL_SERVER_ERROR)
}

