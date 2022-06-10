# Space Observer

An app providing info about dark sky parks located in your state.  

Display a different background image from [NASA APOD API](https://api.nasa.gov/) on each refresh.

## Demo
![ezgif com-gif-maker (9)](https://user-images.githubusercontent.com/43324065/173159239-c5e88d35-78a8-4dcb-9292-374911edba85.gif)

## Dependencies

### Language

- JavaScript
- TypeScript

### Framework

- React

### State Management

- useContext + useReducer hooks

### Libraries

- [Material UI](https://mui.com/)
- [Font Awesome](https://fontawesome.com/)

### Web-scraping

- [axios](https://axios-http.com/docs/intro)
- [jsdom](https://github.com/jsdom/jsdom)

### Database

- PostgreSQL

### APIs

- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
- [NASA APOD API](https://api.nasa.gov/)

## Get Started (for development)

- Clone this repo
- Run `npm install`
- Setup a project on [Google Maps Platform](https://developers.google.com/maps) with [Places API](https://developers.google.com/maps/documentation/places/web-service/overview) and [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) enabled
- Create your own API key following instructions, e.g. [Using API Keys](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
- Create a `.env` file, copy over the examples in `.env.example` and add your own credentials
- Run `npm run scrape`
- To build the client bundle, run `npm run build:client`
- To start the express server, run `npm start`
- Note: this project leverages `husky` pre-push hooks for testing and linting
