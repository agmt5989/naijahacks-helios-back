const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Api ready"
  });
});

//Register route
app.post("/api/register", (req, res) => {
  if (req.body.email == "") {
    return res.json({
      message: "Email field must not be empty"
    });
  }

  if (req.body.username == "") {
    return res.json({
      message: "Username field must not be empty"
    });
  }

  if (req.body.password == "") {
    return res.json({
      message: "Password field must not be empty"
    });
  }
  const user = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
});

app.post('/api/login', (req, res) => {
    const user = {
        email: "test@test.com",
        password: "test1234"
    }
    
    jwt.sign({ user }, 'secretkeyforapi', (err, token) => {
        res.json({
            token,
            email: user.email
        });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
