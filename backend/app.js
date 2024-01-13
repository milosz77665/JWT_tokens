const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const data = require("./database.json");

const app = express();
const port = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const adminRole = "admin";
const userRole = "user";

// Tworzenie listy użytkowników i obiektu z dokumentami
const users = data.users;
const documents = data.documents;

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // Generowanie tokenu - zawiera id użytkownika, nazwę użytkownika oraz jego rolę
    // secretKey - tajny klucz do podpisywania tokenów, używany do weryfikacji
    // expiresIn - czas ważności
    const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, "secretKey", {
      expiresIn: "1h",
    });
    console.debug("Token: ", token);

    res.status(200).json({ token, userId: user.id });
  } else {
    res.status(401).json({ message: "Incorrect data" });
  }
});

const verifyToken = (req, res, next) => {
  // Odczytanie tokenu
  const token = req.headers.authorization.split(" ")[1];

  // Weryfikajca
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Verification error" });
    }

    req.decodedToken = decoded;
    next();
  });
};

app.get("/documents", verifyToken, (req, res) => {
  const userId = req.decodedToken.userId;
  const username = req.decodedToken.username;
  const role = req.decodedToken.role;

  console.debug(`User Role: ${role}`);

  if (role === adminRole) {
    const allDocuments = Object.values(documents).flat();
    console.debug(`Documents for ${username}: ${allDocuments.map((document) => document.title)}`);

    res.status(200).json({ documents: allDocuments });
  } else if (role === userRole) {
    console.debug(`Documents for ${username}: ${documents[userId].map((document) => document.title)}`);

    res.status(200).json({ documents: documents[userId] });
  } else {
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
