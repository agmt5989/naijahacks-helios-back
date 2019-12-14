const express = require("express");
const jwt = require("jsonwebtoken");

const apiRoutes = require('./routes/api')
const userRoute = require('./routes/studentRoute');


const serviceLocator = require('./config/di');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes)

app.listen(5000, () => console.log("Server running on port 5000"));
