# Space Observer
An app providing info about dark sky parks located in your state.

## Dependencies
### Web-scraping
- axios
- jsdom
### Database
- PostgreSQL
### APIs
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
- [NASA APOD API](https://api.nasa.gov/)

## Get Started (for development)
- run `npm install`
- Setup a project on [Google Maps Platform](https://developers.google.com/maps) with [Places API](https://developers.google.com/maps/documentation/places/web-service/overview) and [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) enabled
- Create your own API key following instructions, e.g. [Using API Keys](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
- Create a `.env` file, copy over the examples in `.env.example` and add your own credentials
- run `npm run scrape`
