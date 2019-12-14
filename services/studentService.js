/* eslint-disable no-underscore-dangle */


const MongoDBHelper = require('../config/mongoDBHelper');
const { generateToken, generateEmailToken, decodeEmailToken } = require('../config/lib');
const config = require('../config/config');
const studentModel = require('../models/Student');
const verifyModel = require('../models/VerifyAccountToken');
const uuid = require('uuid/v1')
const {hashPassword, comparePassword} = require('../config/passwordHelper');
const {normalizeFields} = require('../config/normalize')
const {responseMessages} = require('../config/constants');
const moment = require('moment');
// const mailgun = require('mailgun-js')({apiKey: config.mailgun.key, domain: config.mailgun.domain})
const mailgun = require('mailgun-js')({apiKey: 'key-ba963d2783496a480d26d9fb15a8f525', domain: 'powerjamb.ng'});



class StudentService {
	constructor(logger, mongo) {
		this.logger = logger;
		this.studentsMongoDBHelper = new MongoDBHelper(mongo, studentModel);
		this.verifyTokenMongoDBHelper = new MongoDBHelper(mongo, verifyModel)
	}


	async createStudent(studentDetails) {
		this.logger.info(`creating user: ${JSON.stringify(normalizeFields(studentDetails, ['password']))}`);
		try{
			let hashedStudent = await hashPassword(studentDetails);
			let savedStudent = await this.studentsMongoDBHelper.save(hashedStudent);

			let normalizedStudent = normalizeFields(savedStudent, ['password']);


			return {student: normalizedStudent};


		}catch(err){
			return Promise.reject(err)
		}
	}

	async checkIfEmailExists(email, name) {
		try {
			let conditions = {email}
			let student = await this.studentsMongoDBHelper.getOneOptimised({conditions})
			if(student) throw ('Student Already Exists')
			let uuid1 = uuid()
			let tokenData = {
				email, name, uuid : uuid1
			}
			const emailToken = generateEmailToken({...tokenData});
			await this.verifyTokenMongoDBHelper.save({
				uuid: uuid1,
				emailToken
			})
			let resp = await this._sendVerificationMail(email, emailToken, name)
			console.log({resp})
			return resp
		}catch(error){
			throw (error)
		}
	}

	_sendVerificationMail(email, email_token, first_name) {
		return new Promise((resolve, reject) => {
			let mailData = {
				from: 'Do Not Reply <donotreply@powerjamb.ng>',
				to: email,
				subject: 'PowerJamb: Verify your account',
				template: 'pj_email_validation',
				'o:tag': ['verification'],
				'v:firstName': first_name,
				'v:validationToken': email_token,
			};
			return mailgun.messages().send(mailData, (error, body) => {
				if(error) return reject(error);
				console.log({body})
				return resolve(body);
			})
		})

	}


	loginStudent(email, password) {
		const param = {};
		param.conditions = { email };
		return this.studentsMongoDBHelper.getOneOptimised(param)
			.then(async (student) => {
				if(!student) throw new Error(responseMessages.INVALID_USERNAME_OR_PASSWORD);
				if(!student.password) throw(responseMessages.SET_PASSWORD);

				try{
					let isPasswordMatch = comparePassword(student, password);
					if(!isPasswordMatch) throw new Error(responseMessages.INVALID_USERNAME_OR_PASSWORD)

					let tokenData = {userId: student._id, role: student.role};
					let token = generateToken(tokenData);

					return {
						token,
						student: normalizeFields(student, ['password'])
					}
				}catch(err){
					throw new Error(err)
				}

			}).catch(err => {
				throw new Error(err)
			})
	}

	async verifyStudent(token) {

		try{
			let emailTokenObj = await this.verifyTokenMongoDBHelper.getOneOptimised({
				conditions: {emailToken: token}
			});
			if(!emailTokenObj) throw new Error(responseMessages.INVALID_EMAIL_TOKEN);
			let token_expires_in = emailTokenObj.expiresIn;
			let token_has_expired = moment().isSameOrAfter(token_expires_in);
			if(token_has_expired) throw ('Your Token Has Expired')
			let decoded = await decodeEmailToken(token)
			if(!decoded) throw new Error(responseMessages.INVALID_EMAIL_TOKEN);

			let email = decoded.email;
			let data = {isVerified: true};
			let conditions = {email}

			return this.studentsMongoDBHelper.update({conditions}, data).then(student => {
				let tokenData = {userId: studentId, role: decoded.role};
				let token = generateToken(tokenData);

				return {
					token,
					student: normalizeFields(student, ['password'])
				}
			})

		}catch(err){
			throw new Error(err);
		}

	}


	getStudentDetails(student_id) {
		let conditions = {_id: student_id};
		let projection = {"password": 0,}

		return this.studentsMongoDBHelper.getOneOptimised({conditions, projection});
	}

	updateStudentsDetails(student_id, updateData){
		let conditions = {_id: student_id};

		return this.studentsMongoDBHelper.update({conditions}, updateData)
	}

	deleteStudentAccount(student_id){
		let conditions = {_id: student_id};

		return this.studentsMongoDBHelper.update({conditions}, {isDeleted: true})
	}

	async requestResetPassword(email){
		let conditions = {email: email};
		return this.studentsMongoDBHelper.getOneOptimised({conditions}).then(async student => {
			if(!student) throw new Error('Student Does not Exist')
			let student_id = student._id;
			let role = student.role;
			let token_type = config.tokenType.resetPassword;

			let tokenData= {email, role, token_type, student_id}
			let emailToken = generateEmailToken(tokenData)
			try{
				this._sendResetMail(student.email, emailToken, student.name.first);
			}catch(error){
				throw (error);
			}
			return Promise.resolve();
		}).catch(err => {
			throw new Error(err)
		})
	}

	_sendResetMail(email, email_token, first_name) {
		let mailData = {
			from: 'Do Not Reply <donotreply@powerjamb.ng>',
			to: email,
			subject: 'PowerJamb: Reset Your Password',
			template: 'pj_email_validation',
			'o:tag': ['verification'],
			'v:firstName': first_name,
			'v:validationToken': email_token,
		};
		return mailgun.messages().send(mailData, (error, body) => {
			if(error) throw (error);
			console.log({body});
			return Promise.resolve();
		})
	}

	async verifyResetPasswordToken(password_token){
		try{
			let decoded = await decodeEmailToken(password_token)
			if(!decoded) throw new Error(responseMessages.INVALID_RESET_PASSWORD_TOKEN);

			if(decoded.token_type !== config.tokenType.resetPassword) throw new Error(responseMessages.INVALID_RESET_PASSWORD_TOKEN);


			let tokenData = {userId: decoded.student_id, role: decoded.role};
			let token = generateToken(tokenData);

			return {token}


		}catch(err){
			throw new Error(err);
		}
	}

	async resetPassword(student_id, new_password){
		let conditions = {_id: student_id}
		let unHashedPassword = {password: new_password};

		try{
			let hashedPassword = await hashPassword(unHashedPassword);
			return this.studentsMongoDBHelper.update({conditions}, hashedPassword)
		}catch(err){
			throw (err)
		}
	}

}

module.exports = StudentService
