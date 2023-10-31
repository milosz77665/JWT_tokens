const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  res.status(200).json({ success: true, message: "Login successful" });
});

app.post("/register", (req, res) => {
  const { name, surname, email, password } = req.body;
  console.log(name);
  console.log(surname);
  console.log(email);
  console.log(password);

  res.status(200).json({ success: true, message: "Registration successful" });
});

app.listen(5000);
