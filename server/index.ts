const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.get('/main', (req, res) => { //eslint-disable-line
  console.log('hi'); //eslint-disable-line
});

app.get('/background', (req, res) => { //eslint-disable-line
  axios({
    method: 'get',
    url: 'https://www.darksky.org/wp-content/uploads/2015/04/big-bend-featured-700px-460px.png',
    responseType: 'arraybuffer',
  })
    .then((result) => {
      res.contentType('application/octet-stream');
      res.send(result.data);
    });
});

app.listen(3000, () => {
  console.log('Listening to port 3000'); //eslint-disable-line
});
