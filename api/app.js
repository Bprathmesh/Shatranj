const express = require('express');
const { join } = require('node:path');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '../public');

console.log(publicPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../index.html'));
});

app.post('/send_message', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

app.get('/get_new_message', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

module.exports = app;
