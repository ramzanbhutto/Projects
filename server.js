const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/todo-list', (req, res) => {
  res.sendFile(path.join(__dirname, 'todo-list', 'index.html'));
});

app.get('/python-app', (req, res) => {
  res.send('This is the Python app. Implement routing as needed.');
});

app.get('/cpp-app', (req, res) => {
  res.send('This is the C++ app. Implement routing as needed.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
