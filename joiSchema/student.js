const Joi = require('joi')

const createStudentSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
	// password: Joi.string().min(6).required(),
	name: {
		first: Joi.string().required(),
	}
})

const loginStudentSchema = Joi.object().keys({
	email: Joi.string().required(),
	password: Joi.string().required()
})

const loginMvpSchema = Joi.object().keys({
	username: Joi.string().required(),
	password: Joi.string().required()
})

const updateStudentSchema = Joi.object().keys({
	email: Joi.string().email(),
	phone: Joi.string(),
	password: Joi.string(),
	name: {
		first: Joi.string(),
		middle: Joi.string(),
		last: Joi.string()
	},
	state_of_origin: Joi.string(),
	state_of_residence: Joi.string(),
	country: Joi.string(),
	address: Joi.string(),
	dob: Joi.string(),

})

const changePasswordSchema = Joi.object().keys({
	password: Joi.string().min(6).required(),
})

const requestResetPasswordSchema = Joi.object().keys({
	email: Joi.string().email().required()
})

module.exports = {
	createStudentSchema,
	loginStudentSchema, updateStudentSchema,
	changePasswordSchema, requestResetPasswordSchema,
	loginMvpSchema
}

