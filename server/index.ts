const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const { NASA_API_KEY } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.get('/main', (req, res) => { //eslint-disable-line
  console.log('hi'); //eslint-disable-line
});

app.get('/background', (req, res) => { //eslint-disable-line
  const start = new Date(1995, 6, 16);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const randomDateString = randomDate.toISOString().slice(0, 10);
  axios({
    method: 'get',
    url: `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${randomDateString}`,
  })
    .then((result) => axios({
      method: 'get',
      url: result.data.url,
      responseType: 'arraybuffer',
    }))
    .then((imgBuffer) => {
      res.contentType('application/octet-stream');
      res.send(imgBuffer.data);
    });
});

app.listen(3000, () => {
  console.log('Listening to port 3000'); //eslint-disable-line
});
