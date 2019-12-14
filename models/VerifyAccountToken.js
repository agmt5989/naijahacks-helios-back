

const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;
const config = require('../config/config');

const collection = config.mongodb.collections;

const verifySchema = new Schema({
	accessToken: {
		type: String,
		unique: false,
	},
	emailToken: {
		type: String,
		required: true,
		unique: true,
	},
	expiresIn: {
		type: Date,
		default: moment().add(2, 'days')
	},
	active: {
		type: Boolean,
		default: true,
	},
	uuid: String
}, {
	timestamps: true,
});


const VerifyTokenModel = mongoose.model(collection.verify_token, verifySchema);

module.exports = VerifyTokenModel;

