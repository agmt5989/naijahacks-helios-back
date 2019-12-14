

const mongoose = require('mongoose');

const { Schema } = mongoose;
const config = require('../config/config');

const collection = config.mongodb.collections;

const studentsSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	phone: { // TODO: match for valid phone numbers
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		minlength: 6,
		maxlength: 128,
	},
	name: {
		first: {
			type: String,
			maxlength: 128,
			index: true,
			trim: true,
		},
		middle: {
			type: String,
			maxlength: 128,
			trim: true,
		},
		last: {
			type: String,
			maxlength: 128,
			index: true,
			trim: true,
		},
	},
	role: {
		type: String,
		default: config.roles.student,
	},
	balance: {
		type: Number,
		default: 0
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	free_trials: {
		type: Number,
		default: config.exam.freeTrials
	},
	state_of_origin: String,
	state_of_residence: String,
	country: String,
	address: String,
	dob: String,
	current_jamb_subjects: [{type: String}],
	current_selected_institutions: [{type: Schema.Types.ObjectId, ref: collection.institutions}]

}, {
	timestamps: true,
});


const StudentsModel = mongoose.model(collection.students, studentsSchema);

module.exports = StudentsModel;

