const Joi = require('joi');
const Response = require('./responseManager');
const  {responseMessages, HttpStatus} = require('./constants');



exports.validateSchema = (res, schema, data) => new Promise((resolve, reject) => {

	if(!schema) return Response.failure(res, {message : responseMessages.EMPTY_SCHEMA}, HttpStatus.INTERNAL_SERVER_ERROR);
	if(!data) return Response.failure(res, {message : responseMessages.FORM_BODY_EMPTY}, HttpStatus.BAD_REQUEST);
	return Joi.validate(data, schema, (err, value) => {
		if(err) return Response.failure(res, {message : err.details[0].message}, HttpStatus.BAD_REQUEST);
		return resolve();
	})
})



