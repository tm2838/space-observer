/* eslint-disable no-param-reassign */
require('dotenv').config();

const { GOOGLE_API_KEY } = process.env;

const axios = require('axios');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const googlePlacesApi = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

const scrapeImage = async (park) => axios({
  method: 'get',
  url: park.webPage,
})
  .then((res) => {
    const dom = new JSDOM(res.data);
    park.image = dom.window.document.querySelector('.post_image').src;
  })
  .catch((err) => {
    console.log(park, err); //eslint-disable-line
  });

const getParsedParkName = (park) => park.name.split(' ');

const getAddress = async (park) => {
  const nameString = getParsedParkName(park).join('%20').replace('á', 'a');
  const googleInputParams = `?input=${nameString}&inputtype=textquery&fields=formatted_address%2Cgeometry&key=${GOOGLE_API_KEY}`;
  return axios({
    method: 'get',
    url: `${googlePlacesApi}${googleInputParams}`,
  })
    .then((result) => {
      const { lat, lng } = result.data.candidates[0].geometry.location;
      return axios({
        method: 'get',
        url: `${googlePlacesApi}?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
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
      console.log(park, err); //eslint-disable-line
    });
};

module.exports = {
  scrapeImage,
  getAddress,
};
