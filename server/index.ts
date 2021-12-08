const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.get('/', (req, res) => { //eslint-disable-line
  console.log('hi'); //eslint-disable-line
});

app.listen(3000, () => {
  console.log('Listening to port 3000'); //eslint-disable-line
});
