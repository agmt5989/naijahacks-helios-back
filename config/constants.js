class HTTPStatus {}

Object.defineProperty(HTTPStatus, 'OK', {
	value: 200,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'CREATED', {
	value: 201,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'ACCEPTED', {
	value: 202,
	writable: false,
	enumerable: true,
	configurable: false,
});


Object.defineProperty(HTTPStatus, 'BAD_REQUEST', {
	value: 400,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'UNAUTHORIZED', {
	value: 401,
	writable: false,
	enumerable: true,
	configurable: false,
});


Object.defineProperty(HTTPStatus, 'FORBIDDEN', {
	value: 403,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'NOT_FOUND', {
	value: 404,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'METHOD_NOT_ALLOWED', {
	value: 405,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'NOT_ACCEPTABLE', {
	value: 406,
	writable: false,
	enumerable: true,
	configurable: false,
});


Object.defineProperty(HTTPStatus, 'PROXY_AUTHENTICATION_REQUIRED', {
	value: 407,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'REQUEST_TIMEOUT', {
	value: 408,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'INTERNAL_SERVER_ERROR', {
	value: 500,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'NOT_IMPLEMENTED', {
	value: 501,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'BAD_GATEWAY', {
	value: 502,
	writable: false,
	enumerable: true,
	configurable: false,
});

Object.defineProperty(HTTPStatus, 'SERVICE_UNAVAILABLE', {
	value: 503,
	writable: false,
	enumerable: true,
	configurable: false,
});

messages = {
	BAD_REQUEST: 'Bad Request',

	CONTACT_THE_EXAMINER: 'Please contact the examiner to include your institution',
	CANNOT_ENROL_FOR_EXAM: 'Enrollment for Exam has closed',

	EMPTY_SCHEMA: "Please provide a schema",
	EMPTY_EMAIL_TOKEN: 'Please Provide a valid email token',
	EMAIL_OR_PHONE_NUMBER_EXISTS: "Email or Phone Number Already Exists",
	ENROLLMENT_CREATED: "Enrollment Created",
	ENROLLMENT_DETAILS: 'Enrollment Details',
	ERROR_CHANGING_PASSWORD: 'Error Changing Password',
	ERROR_CREATING_ENROLLMENT: 'Error Enrolling For Exam',
	ERROR_CREATING_RECORD: 'Error Creating New Record',
	ERROR_CREATING_STUDENT: 'Error Creating Student',
	ERROR_DELETING_RECORD: 'Error Deleting Record',
	ERROR_DELETING_USER: 'Error Deleting User',
	ERROR_DELETING_QUESTION: 'Error Deleting Question',
	ERROR_FETCHING_DETAILS: 'Error Fetching Details',
	ERROR_FETCHING_EXAMS: 'Error Fetching Exams',
	ERROR_FETCHING_LIST: 'Error Fetching List',
	ERROR_FETCHING_QUESTIONS: 'Error Fetching Questions',
	ERROR_READING_FILE: 'Error Reading file',
	ERROR_SENDING_RESET_PASSWORD: 'Error sending Reset Password Token',
	ERROR_UPDATING_RECORDS: 'Error Updating Records',
	ERROR_VALIDATING_PASSWORD_TOKEN: 'Error Validating Password Token',
	ERROR_VERIFYING_PAYMENT:' Error Verifying payment',
	EXAM_CREATED: 'New Exam Successfully Created',
	EXAM_CREATION_FAILED: 'Error Creating New Exam',
	EXAM_DELETED: 'Exam Successfully Deleted',
	EXAM_NOT_STARTED: 'Exam Has Not yet Started',
	EXAM_ENDED: 'Exam has Ended',

	EXAM_DETAILS: 'Exam Details',
	EXAM_LIST: 'Exam List',


	FAILED_VERIFICATION: 'Email Verification Failed',
	FETCH_SUCCESSFUL: 'Fetch Successful',
	FILE_SHOULD_BE_JSON: 'Uploaded File should be .json file type',
	FILE_UPLOADED: 'File Uploaded',
	FILE_UPLOAD_FAILED: 'File Upload Failed',
	FORM_BODY_EMPTY:'Form Body can\'t be empty',

	INELIGIBLE_FOR_EXAM: 'You are Ineligible to take this exam',
	INVALID_EMAIL_TOKEN: 'Email Token is Incorrect',
	INVALID_RESET_PASSWORD_TOKEN: 'Token is Invalid',
	INVALID_PAGE_NUMBER: 'Invalid Page Number',
	INVALID_USERNAME_OR_PASSWORD: 'Invalid Username or Password',
	INST_CREATED: 'Institution Created',
	INST_CREATION_FAILED: 'Failed to create Institution',
	INST_LIST: 'Institution List',
	INST_DETAILS: 'Institution Details',

	LOGIN_SUCCESSFUL: 'Login Successful',
	LOGIN_ERROR: 'Login Failed',

	NO_JSON_FILE_PROVIDED: 'No Json File Provided',

	PASSWORD_TOKEN_VALIDATED: 'Password Token Validated',
	PASSWORD_SUCCESSFULLY_CHANGED: 'Passwor successfully changed',
	PAYMENT_LIST: 'Payments List',
	PAYMENT_INITIALIZED: 'Payment Successfully Initialized',
	PAYMENT_INITIALIZATION_FAILED: 'Payment Initialization Failed',
	PAYMENT_VERIFICATION_SUCCESSFUL: 'Payment Verification Successful',
	PAYMENT_VERIFICATION_FAILED: 'Payment Verification Failed',
	PROVIDE_EXAM_ID: 'Provide Valid Exam Id',
	PROVIDE_SUBJECT: 'Provide Subject',
	PROVIDE_QUESTION_ID: 'Provide a Question Id',
	PROVIDE_INSTITUTION: 'You have not registered any institutions',

	QUESTION_LIST: 'Successfully fetched Questions',
	QUESTION_DELETED: 'Question Deleted',
	QUESTIONS: 'Questions',

	RECORDS_CREATED: 'Successfully created new record',
	RECORDS_UPDATED: 'Successfully updated record',
	RECORDS_LIST: 'Records List',
	RECORDS_DETAILS: 'Records Details',
	RECORD_DELETED: 'Record Successfully Deleted',
	RESET_PASSWORD_EMAIL_SENT: 'Reset Password Email Sent',


	STUDENT_HAS_PENDING_ENROLLMENT: 'Student Has Pending Enrollment',
	STUDENT_HAS_INSUFFICIENT_FUNDS: 'Student Does not Have Sufficient Funds',
	SET_PASSWORD: 'Set Password',

	TRANSACTION_LIST: 'Transactions List',

	UNAUTHORIZED: 'Oops, you do not have access to this resource',
	UPDATE_ERROR: 'Error Updating',
	UPDATE_SUCCESSFUL: 'Update Successful',
	USER_CREATED: 'User Successfully created',
	USER_DELETED: 'User Deleted',
	USER_VERIFIED: 'Email Verification Successful',

};

module.exports.HTTPStatus = HTTPStatus;
module.exports.responseMessages = messages;

