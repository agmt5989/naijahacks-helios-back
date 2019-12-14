

const config = require('../config/settings');
const {validateToken} = require('../lib/utilityHelper')

const routes = function routes(server, serviceLocator) {
	const studentController = serviceLocator.get('studentController');

	server.get({
		path: '/',
		name: 'base',
		version: '1.0.0',
	}, (req, res) => res.send(`Welcome to ${config.appName} API`));

	server.post({
		path: '/student',
		name: 'Create new Student Account',
		version: '1.0.0',
	}, (req, res) => studentController.createStudent(req, res));

	server.post({
		path: '/student/login',
		name: 'login student',
		version: '1.0.0',
	}, (req, res) => studentController.loginStudent(req, res));

	server.put({
		path: '/student',
		name: 'Update Student Account',
		version: '1.0.0',
	},validateToken, (req, res) => studentController.updateStudent(req, res));

	server.get({
		path: '/student',
		name: 'Get Student Details',
		version: '1.0.0',
	},validateToken, (req, res) => studentController.getStudentDetails(req, res));

	server.get({
		path: '/student/verify/:email_token',
		name: 'verify email Address',
		version: '1.0.0',
	}, (req, res) => studentController.verifyStudent(req, res));

	server.post({
		path: '/student/delete',
		name: 'delete student account',
		version: '1.0.0',
	},validateToken, (req, res) => studentController.deleteStudentAccount(req, res));

	server.post({
		path: '/student/reset',
		name: 'Reset Password',
		version: '1.0.0',
	},validateToken, (req, res) => studentController.resetPassword(req, res));

	server.post({
		path: '/student/reset/request',
		name: 'Request Reset Password',
		version: '1.0.0',
	}, (req, res) => studentController.requestResetPassword(req, res));

	server.get({
		path: '/student/reset/:password_token',
		name: 'Verify Psssword Token',
		version: '1.0.0',
	},validateToken, (req, res) => studentController.verifyResetPasswordToken(req, res));

	server.post({
		path: '/student/email',
		name: 'Check Email',
		version: '1.0.0',
	}, (req, res) => studentController.checkIfEmailExists(req, res))




};


module.exports = routes;

