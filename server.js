const express = require("express");
const jwt = require("jsonwebtoken");

const apiRoutes = require('./routes/api')
const userRoute = require('./routes/studentRoute');


const serviceLocator = require('./config/di');
const logger = serviceLocator.get('logger');

const app = express();

app.use(express.json());

// Connect to Mongo
serviceLocator.get('mongo');

app.use('/api', apiRoutes);

// setup Routing and Error Event Handling
userRoute(app, serviceLocator);

app.listen(5000, () => console.log("Server running on port 5000"));
