const redis = require('redis');
const rabbit = require('amqplib');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
let MongoClient = require('mongodb').MongoClient;

const config = require('../config/config');
const serviceLocator = require('../config/serviceLocator');

const winston = require('winston');
require('winston-daily-rotate-file');

const StudentService = require('../services/studentService');
const StudentController = require('../controllers/StudentController');


/**
 * Returns an instance of logger for the API
 */
serviceLocator.register('logger', () => {
	const fileTransport = new (winston.transports.DailyRotateFile)({
		filename: `${config.logging.file}`,
		datePattern: 'yyyy-MM-dd.',
		prepend: true,
		level: process.env.ENV === 'development' ? 'debug' : 'info',
	});

	const consoleTransport = new (winston.transports.Console)({
		datePattern: 'yyyy-MM-dd.',
		prepend: true,
		json: false,
		colorize: true,
		level: process.env.ENV === 'development' ? 'debug' : 'info',
	});
	const transports = [consoleTransport];

	if (config.logging.shouldLogToFile.toString() === 'true') {
		transports.push(fileTransport);
	}
	const winstonLogger = new (winston.Logger)({
		transports,
	});
	return winstonLogger;
});


/**
 * Returns a Mongo connection instance.
 */
serviceLocator.register('mongo', (servicelocator) => {
	const logger = servicelocator.get('logger');
	let connectionString;

	if (process.env.NODE_ENV === 'dev') {
		connectionString = (!config.mongodb.username || !config.mongodb.password) ?
			`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}` :
			`mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;
	} else {
		connectionString = `mongodb://heroku_hkmqtzcs:gk1di5mi5kopa3shiq4rt4s96j@ds257507.mlab.com:57507/heroku_hkmqtzcs`;
	} logger.info(process.env.NODE_ENV);

	/*const connectionString = (!config.mongodb.username || !config.mongodb.password) ?
			`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}` :
			`mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;*/
	// const connectionString = `mongodb://heroku_hkmqtzcs:gk1di5mi5kopa3shiq4rt4s96j@ds257507.mlab.com:57507/heroku_hkmqtzcs`;
	mongoose.Promise = bluebird;
	const mongo = mongoose.connect(connectionString, { useNewUrlParser: true })
		.then((db) => {
			logger.info('Mongo Connection Established');

			// If the Node process ends, close the Mongoose connection
			process.on('SIGINT', () => {
				logger.error('Mongoose default connection disconnected through app termination');
				process.exit(0);

			});
		})
		.catch(err => {
			logger.error(`Mongo Connection Error : ${err}`);
		});

	return mongo;
});

serviceLocator.register('mongodb', (servicelocator) => {
	const logger = servicelocator.get('logger');

	const connectionString = (!config.mongodb.username || !config.mongodb.password) ?
		`mongodb://${config.mongodb.host}:${config.mongodb.port}` :
		`mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}`;

	return MongoClient.connect(connectionString, (err, client) => {
		if (err) return console.log(err);
		let db = client.db(config.mongodb.db);
		return db;
	});

});

/**
 * Returns a RabbitMQ connection instance.
 */
serviceLocator.register('rabbitmq', (servicelocator) => {
	const logger = servicelocator.get('logger');
	const connectionString = `amqp://${config.rabbitMQ.user}:${config.rabbitMQ.pass}@${config.rabbitMQ.host}:${config.rabbitMQ.port}`;
	// const connectionString = `amqp://adjqipwz:2J2dO3c0RWraRUMFfcXB1noqO4qFyxCd@barnacle.rmq.cloudamqp.com/adjqipwz`;
	console.log({ connectionString });
	return rabbit.connect(connectionString, (err, connection) => new Promise((resolve, reject) => {
		// If the connection throws an error
		if (err) {
			logger.error(`RabbitMQ connection error: ${err}`);
			return reject(err);
		}

		connection.on('error', (connectionError) => {
			logger.error(`RabbitMQ connection error: ${connectionError}`);
			process.exit(1);
		});

		connection.on('blocked', (reason) => {
			logger.error(`RabbitMQ connection blocked: ${reason}`);
			process.exit(1);
		});

		// If the Node process ends, close the RabbitMQ connection
		process.on('SIGINT', () => {
			connection.close();
			process.exit(0);
		});


		return resolve(connection);
	}));
});


/**
 * Returns a Redis connection instance.
 */
serviceLocator.register('redis', (servicelocator) => {
	const logger = servicelocator.get('logger');
	bluebird.promisifyAll(redis.RedisClient.prototype);
	bluebird.promisifyAll(redis.Multi.prototype);
	const connectionParameters = {
		host: config.redis.host,
		port: config.redis.port,
		db: config.redis.database,
	};
	if (config.redis.password) {
		connectionParameters.password = config.redis.password;
	}

	console.log({ connectionParameters });
	const myRedis = redis.createClient(connectionParameters);
	myRedis.on('connect', () => {
		logger.info('Redis connection established');
	});
	myRedis.on('error', (err) => {
		logger.error(`Connection error : ${err}`);
		myRedis.quit();
		process.exit(1);
	});

	myRedis.on('end', () => {
		logger.error('Redis is shutting down');
		process.exit(1);
	});

	// If the Node process ends, close the Redis connection
	process.on('SIGINT', () => {
		myRedis.quit();
		process.exit(0);
	});


	return myRedis;
});

/**
 * Returns a Redis connection instance for database 1.
 */
serviceLocator.register('redis1', (servicelocator) => {
	const logger = servicelocator.get('logger');
	bluebird.promisifyAll(redis.RedisClient.prototype);
	bluebird.promisifyAll(redis.Multi.prototype);
	const connectionParameters = {
		host: config.redis.host,
		port: config.redis.port,
		db: config.redis.database_1,
	};
	if (config.redis.password) {
		connectionParameters.password = config.redis.password;
	}

	console.log({ connectionParameters });
	const myRedis = redis.createClient(connectionParameters);
	myRedis.on('connect', () => {
		logger.info('Redis connection established');
	});
	myRedis.on('error', (err) => {
		logger.error(`Connection error : ${err}`);
		myRedis.quit();
		process.exit(1);
	});

	myRedis.on('end', () => {
		logger.error('Redis is shutting down');
		process.exit(1);
	});

	// If the Node process ends, close the Redis connection
	process.on('SIGINT', () => {
		myRedis.quit();
		process.exit(0);
	});


	return myRedis;
});


/**
 * Creates an instance of the Student Service
 */
serviceLocator.register('studentService', (servicelocator) => {
	const logger = servicelocator.get('logger');
	const mongo = servicelocator.get('mongo');
	return new StudentService(logger, mongo);
});


/**
 * Creates an instance of the Student Controller
 */
serviceLocator.register('studentController', (servicelocator) => {
	const logger = servicelocator.get('logger');
	const service = servicelocator.get('studentService');
	return new StudentController(logger, service);
});


module.exports = serviceLocator;
