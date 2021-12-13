/* eslint-disable no-param-reassign */
import express from 'express';
import cors from 'cors';
import path from 'path';

import { getApodImage } from './utils';
import getParksInState from '../database/utils';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.get('/background', async (req, res) => { //eslint-disable-line
  await getApodImage(req, res);
});

app.get('/searchParks', async (req, res) => {
  await getParksInState(req, res);
});

app.listen(3000, () => {
  console.log('Listening on port 3000'); //eslint-disable-line
});
