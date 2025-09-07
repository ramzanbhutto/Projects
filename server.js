const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve static files from the sub-directories
app.use('/todo-list', express.static(path.join(__dirname, 'todo-list')));
app.use('/Calculator', express.static(path.join(__dirname, 'Calculator')));
app.use('/Password-Manager', express.static(path.join(__dirname, 'Password-Manager')));
app.use('/Love-Site', express.static(path.join(__dirname, 'Love-Site')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
