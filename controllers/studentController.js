/* eslint-disable eqeqeq,camelcase */

const  Response = require('../config/responseManager');
const  {responseMessages, HttpStatus} = require('../config/constants');
const  config = require('../config/config');
const {validateSchema} = require('../config/joiHelper');
const {parseError, normalizeFields} = require('../config/normalize')
let {createStudentSchema, loginStudentSchema, updateStudentSchema,
	requestResetPasswordSchema, changePasswordSchema
} = require('../joiSchema/student')


class StudentController {
	constructor(logger, service) {
		this.logger = logger;
		this.studentService = service;
	}


	createStudent(req, res) {
		const { body } = req;
		return validateSchema(res, createStudentSchema, body).then(() => {
			return this.studentService.createStudent(body).then(response => {
				return Response.success(res, {message: responseMessages.USER_CREATED, data: response}, HttpStatus.OK)
			}).catch(error => {
				this.logger.info(`Error Encountered during student signup {ErrDetails: ${error}}`)

				if(error.code === config.MongoErrorCode.duplicateError){
					return Response.failure(res, {message: responseMessages.EMAIL_OR_PHONE_NUMBER_EXISTS}, HttpStatus.BAD_REQUEST);
				}

				return Response.failure(res, {message: responseMessages.ERROR_CREATING_STUDENT}, HttpStatus.INTERNAL_SERVER_ERROR)
			})
		})
	}

	loginStudent(req, res) {
		let {body} = req;
		return validateSchema(res, loginStudentSchema, body).then(() => {
			return this.studentService.loginStudent(body.email, body.password).then(response => {
				this.logger.info('User Logged In')
				return Response.success(res, {message: responseMessages.LOGIN_SUCCESSFUL, data: response}, HttpStatus.OK)
			}).catch(error => {
				this.logger.info(`Error Encountered during student login {ErrDetails: ${error}}`)
				// return error.message ? Response.failure(res, {message: error.message}, HttpStatus.BAD_REQUEST)
				//   : Response.failure(res, {message: responseMessages.LOGIN_ERROR}, HttpStatus.INTERNAL_SERVER_ERROR)
				return parseError(res, error, responseMessages.LOGIN_ERROR)
			})
		})
	}


	updateStudent(req, res) {
		let {body, userId} = req;

		return validateSchema(res, updateStudentSchema, body).then(response => {
			return this.studentService.updateStudentsDetails(userId, body).then(response => {
				this.logger.info(`Successfully updated details for student ${userId}`);
				let normalizedResponse = normalizeFields(response, ['password'])
				return Response.success(res, {message: responseMessages.UPDATE_SUCCESSFUL, data: normalizedResponse}, HttpStatus.OK);
			}).catch(error => {
				this.logger.info(`Error Encountered during student details update {ErrDetails: ${error}}`)

				if(error.code === config.MongoErrorCode.duplicateError){
					return Response.failure(res, {message: responseMessages.EMAIL_OR_PHONE_NUMBER_EXISTS}, HttpStatus.BAD_REQUEST);
				}

				return Response.failure(res, {message: responseMessages.UPDATE_ERROR}, HttpStatus.INTERNAL_SERVER_ERROR)
			})
		})
	}


	getStudentDetails(req, res) {
		let {userId} = req;

		return this.studentService.getStudentDetails(userId).then(response => {
			this.logger.info(`Details for Student ${userId} successfully fetched`);
			return Response.success(res, {message: responseMessages.FETCH_SUCCESSFUL, data: response}, HttpStatus.OK)
		}).catch(error => {
			this.logger.info(`Error Encountered while fetching Details for student ${userId}, {err: ${JSON.stringify(error)}}`)

			return Response.failure(res, {message: responseMessages.ERROR_FETCHING_DETAILS}, HttpStatus.INTERNAL_SERVER_ERROR);
		})
	}


	verifyStudent(req, res) {
		let {params: {email_token}} = req;

		if(!email_token) return Response.failure(res, {message: responseMessages.EMPTY_EMAIL_TOKEN}, HttpStatus.BAD_REQUEST);

		return this.studentService.verifyStudent(email_token).then(response => {
			this.logger.info(`Successfully verified email for Student ${response.student._id}`);
			return Response.success(res, {message: responseMessages.USER_VERIFIED, data: response}, HttpStatus.OK)
		}).catch(error => {
			return parseError(res, error, responseMessages.FAILED_VERIFICATION);
		})
	}


	deleteStudentAccount(req, res){
		let {userId} = req;

		return this.studentService.deleteStudentAccount(userId).then(() => {
			this.logger.info(`Successfully deleted account for student ${userId}`);

			return Response.success(res, {message: responseMessages.USER_DELETED})
		}).catch(error => {
			this.logger.info(`Error Deleting Student ${userId} {errDetails: ${error}}`);
			return parseError(res, error, responseMessages.ERROR_DELETING_USER)

		})
	}

	requestResetPassword(req, res){
		let {body} = req;

		return validateSchema(res, requestResetPasswordSchema, body).then(() => {
			return this.studentService.requestResetPassword(body.email).then(() => {
				return Response.success(res, {message: responseMessages.RESET_PASSWORD_EMAIL_SENT})
			}).catch(error => parseError(res, error, responseMessages.ERROR_SENDING_RESET_PASSWORD))
		})
	}

	verifyResetPasswordToken(req, res){
		let {params: {password_token}} = req;

		return this.studentService.verifyResetPasswordToken(password_token).then(response => {
			return Response.success(res, {data: response, message: responseMessages.PASSWORD_TOKEN_VALIDATED})
		}).catch(error => parseError(res, error, responseMessages.ERROR_VALIDATING_PASSWORD_TOKEN))
	}

	resetPassword(req, res){
		let {userId, body} = req;

		return validateSchema(res, changePasswordSchema, body).then(() => {
			return this.studentService.resetPassword(userId, body.password).then((response) => {
				return Response.success(res, {message: responseMessages.PASSWORD_SUCCESSFULLY_CHANGED})
			})
		}).catch(error => parseError(res, error, responseMessages.ERROR_CHANGING_PASSWORD))
	}

	async checkIfEmailExists(req, res){
		let {body: {email, first_name}} = req;
		if(!email) return Response.failure(res, {message: responseMessages.EMPTY_SCHEMA}, HttpStatus.INTERNAL_SERVER_ERROR);
		if(!first_name) return Response.failure(res, {message: responseMessages.EMPTY_SCHEMA}, HttpStatus.INTERNAL_SERVER_ERROR);

		try{
			let response = await this.studentService.checkIfEmailExists(email);
			return Response.success(res, {data: response}, HttpStatus.OK)

		}catch(error){
			console.log({error})
			return Response.failure(res, {message: 'Error Checking Mail'}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

module.exports = StudentController
