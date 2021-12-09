require('dotenv').config();
const axios = require('axios');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { GOOGLE_API_KEY } = process.env;

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

let usParks;

const scrapeImage = async (park) => axios({
  method: 'get',
  url: park.webPage,
})
  .then((res) => {
    const dom = new JSDOM(res.data);
    park.image = dom.window.document.querySelector('.post_image').src;
  })
  .catch((err) => {
    console.log(park, err);
  });

const getParsedParkName = (park) => park.name.split(' ');

const getAddress = async (park) => {
  const nameString = getParsedParkName(park).join('%20').replace('á', 'a');
  return axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${nameString}&inputtype=textquery&fields=formatted_address%2Cgeometry&key=${GOOGLE_API_KEY}`,
  })
    .then((result) => {
      const { lat, lng } = result.data.candidates[0].geometry.location;
      return axios({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      });
    })
    .then((r) => {
      const candidates = r.data.results;
      let state;
      candidates.forEach((candidate) => candidate.address_components.forEach((address) => {
        if (address.types.includes('administrative_area_level_1')) {
          state = address.short_name;
        }
      }));
      park.state = state;
    })
    .catch((err) => {
      console.log(park, err);
    });
};

// Main function to scrape parks
axios({
  method: 'get',
  url: 'https://www.darksky.org/our-work/conservation/idsp/parks/',
})
  .then((res) => {
    const dom = new JSDOM(res.data);

    // array of html elements
    const allParks = Array.from(dom.window.document.querySelector('.subpages').children);

    // array of objects of shape {name: 'xxx', webPage: 'xxx'}
    usParks = allParks.filter((park) => park.textContent.includes('U.S.')).map((park) => ({ name: park.children[0].textContent, webPage: park.children[0].href }));

    // scrap an image from each of the subpage and add it to the object
    const scrapeImagePromises = [];
    usParks.forEach((park) => {
      scrapeImagePromises.push(scrapeImage(park));
    });
    return Promise.all(scrapeImagePromises);
  })
  .then(() => {
  // send request to Google Places API and get state
    const getAddressPromises = [];
    usParks.forEach((park) => {
      getAddressPromises.push(getAddress(park));
    });
    return Promise.all(getAddressPromises);
  })
  .then(() => {
  // write into database
    pool.query('CREATE TABLE usparks (id SERIAL PRIMARY KEY, name TEXT, webPage TEXT, image TEXT, state TEXT)', (err, suc) => {
      if (err) {
        throw err;
      }
      usParks.forEach(async (park) => {
        await pool.query('INSERT INTO usparks (name, webPage, image, state) VALUES ($1, $2, $3, $4)', [park.name, park.webPage, park.image, park.state]);
      });
    });
  });

// //front end:
// // utilize NASA's API - different background picture on refresh (error handling: needs to have a default img)
// // input a zipcode
// // returns tio five nearest dark sky parks in a carousel
// // click on one of them will take to the corresponding page
