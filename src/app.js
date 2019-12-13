const express = require('express');
const {router} = require('./routers/user');
const port = process.env.PORT;
require('./db/db')

app = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
	console.log(`Your API is listening on ${port}`);
});
