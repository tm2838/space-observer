/* eslint-disable no-param-reassign */
import axios from 'axios';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const getParksInState = (req, res) => {
  const { state } = req.query;
  let parks;
  const parkPromises = [];
  pool.query('SELECT * FROM usparks WHERE state = $1', [state], (err, results) => {
    if (err) {
      res.status(500).end();
    }

    if (!results.rows.length) {
      res.status(404).send('404: Parks in requested state not found');
    } else {
      parks = results.rows;

      parks.forEach((park) => {
        parkPromises.push(
          axios({
            method: 'get',
            url: park.image,
            responseType: 'arraybuffer',
          })
            .then((imgBuffer) => { park.imgBuffer = imgBuffer.data; }),
        );
      });

      Promise.all(parkPromises)
        .then(() => {
          res.status(200).send(parks);
        });
    }
  });
};

export default getParksInState;
