// const axios = require('axios');
import axios from 'axios';

require('dotenv').config();

const { NASA_API_KEY } = process.env;
const NASA_API_STRING = 'https://api.nasa.gov/planetary/apod';

export const getRandomDate = () => {
  const start = new Date(1995, 6, 16);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().slice(0, 10);
};

export const getApodImage = (req, res) => {
  const randomDate = getRandomDate();
  axios({
    method: 'get',
    url: `${NASA_API_STRING}?api_key=${NASA_API_KEY}&date=${randomDate}`,
  })
    .then((result) => axios({
      method: 'get',
      url: result.data.url,
      responseType: 'arraybuffer',
    }))
    .then((imgBuffer) => {
      res.contentType('application/octet-stream');
      res.send(imgBuffer.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
