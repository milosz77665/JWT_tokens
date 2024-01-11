const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Odczyt database.js
let data;
try {
  data = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
  console.debug("Users: ", data.users);
  console.debug("Documents: ", data.documents);
} catch (err) {
  console.error('File reading error:', err.message);
  process.exit(1);
}
// Tworzenie listy użytkowników i wszystkich dostępnych dokumentów
const users = data.users;
const documents = data.documents;

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generowanie tokenu - zawiera identyfikator użytkownika i dostęp do określonych plików
    // secretKey - tajny klucz do podpisywania tokenów, używany do weryfikacji
    // expiresIn - czas ważności 
    const token = jwt.sign({ userId: user.id, access: user.documents }, 'secretKey', { expiresIn: '1h' });
    console.debug("Token: ", token);

    // Przesłanie nazw wszystkich dostępnych dokumentów do użytkownika
    const allDocumentNames = Object.keys(documents).map(docId => ({
      id: docId,
      name: documents[docId][0].title
    }));
    console.log("Documents: ", allDocumentNames);

    res.status(200).json({ token, documents: allDocumentNames });
  } else {
    res.status(401).json({ message: 'Incorrect data' });
  }
});

const verifyTokenAndCheckDocumentAccess = (req, res, next) => {
  // Odczytanie tokenu
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Verification error' });
    }

    const documentId = req.params.documentId;

    // Sprawdzamy czy ma dostęp do tego co chce 
    if (decoded.access.includes(Number(documentId))) {
      req.decodedToken = decoded;
      next();
    } else {
      return res.status(403).json({ message: 'No access' });
    }
  });
};

app.get('/documents/:documentId', verifyTokenAndCheckDocumentAccess, (req, res) => {
  const documentId = req.params.documentId;
  console.debug("DocumentId: ", documentId);
  const documentContent = documents[documentId][0].content;
  console.debug("Content: ", documentContent);
  res.json({ documentContent, userId: req.decodedToken.userId });
});

app.post('/logout', (req, res) => {
  console.debug("Logout");
  res.status(200).json({ message: 'Logout successful' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});