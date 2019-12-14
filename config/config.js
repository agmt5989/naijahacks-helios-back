const config = {
	appName: process.env.APP_NAME,
	api_key: process.env.API_KEY,
	port: process.env.API_PORT,
	logging: {
		file: process.env.LOG_PATH,
		level: process.env.LOG_LEVEL || 'warn',
		console: process.env.LOG_ENABLE_CONSOLE || true,
		shouldLogToFile: process.env.COOKIE_SYNC_ENABLE_FILE_LOGGING || false,
	},
	mongodb: {
		host: process.env.PJAMB_MONGO_HOST,
		username: process.env.PJAMB_MONGO_USER,
		password: process.env.PJAMB_MONGO_PASSWORD,
		port: process.env.PJAMB_MONGO_PORT,
		db: process.env.PJAMB_MONGO_DB_NAME,
		que_db: process.env.PJAMB_MONGO_QUE_DB_NAME,
		query_limit: process.env.PJAMB_MONGO_QUERY_LIMIT,
		collections: {
			students: 'Students',
			enrollments: 'Enrollments',
			exams: 'Exams',
			records: 'Records',
			transaction_history: 'TransactionHistory',
			admin: 'Admin',
			institutions: 'Institutions',
			subject: 'Subject',
			answers_history: 'AnswersHistory',
			verify_token: 'VerifyToken',
			mvp : 'mvp'
		},
	},
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		database: process.env.REDIS_DATABASE,
		database_1: process.env.REDIS_DATABASE_1,
		password: process.env.REDIS_PASSWORD,
		pubSubchannels: {
			talentBase: 'CookieChannel'
		}
	},
	rabbitMQ: {
		host: process.env.PJAMB_RABBIT_HOST,
		port: process.env.PJAMB_RABBIT_PORT,
		user: process.env.PJAMB_RABBIT_USER,
		pass: process.env.PJAMB_RABBIT_PASS,
		queues: {
			questionQueue: 'QUESTION_QUEUE',
			answeredQueue: 'ANSWERED_BY_QUEUE'
		},
	},
	mailgun: {
		key: process.env.MAILGUN_KEY,
		domain: process.env.MAILGUN_DOMAIN
	},
	TokenSigning: {
		secret: process.env.TOKEN_SECRET,
		algorithm: process.env.TOKEN_SIGNING_ALGORITHM,
		email_token_secret: process.env.EMAIL_TOKEN_SECRET,
		email_token_expiry_minutes: process.env.EMAIL_TOKEN_EXPIRY_MINUTES
	},
	paystack: {
		secret: process.env.PAYSTACK_SECRET
	},
	MongoErrorCode: {
		duplicateError: 11000
	},
	exam: {
		freeTrials: process.env.NUMBER_OF_FREE_TRIALS,
		examCost: process.env.COST_OF_EXAM,
		paymentType: {
			free: 0,
			paid: 1
		},
		type:{
			general: 0,
			schoolBased: 1
		},
		questions: 15
	},
	roles:{
		student: 0,
		admin: 1,
		support: 2
	},
	enrollmentStatus: {
		Awaiting: 0,
		Done: 1,
		Missed: 2
	},
	transactionType: {
		Deposit: 0,
		Enroll: 1
	},
	admin_access_type:{
		read: 0,
		write: 1,
		read_write: 2
	},
	DepositStatus: {
		Pending: 0,
		Failed: 1,
		Successful: 2
	},
	tokenType: {
		confirmEmail: 0,
		resetPassword: 1
	},
	subjects: {
		crk: 'crk',
		english: 'eng',
		maths: 'mth',
		irk: 'irk',
		physics: 'phy',
		chemistry: 'chm',
		government: 'govt',
		igbo: 'igbo',
		yoruba: 'yor',
		literature: 'lit',
		biology: 'bio',
		commerce: 'comm',

	}
};

module.exports = config;
