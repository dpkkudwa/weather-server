const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = 3000;

// Define paths for express config.
const publicDirectoryPath = express.static(path.join(__dirname, '../public'));
const bootstrapPath = express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'));
const viewsPath = path.join(__dirname, '../templates/views');
const jqueryPath = express.static(path.join(__dirname, '../node_modules/jquery/dist'));
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directory to serve.
app.use(publicDirectoryPath);
app.use(bootstrapPath);
app.use(jqueryPath);

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  const address = '';
  res.render('index', {
    address: address
  });
});

app.post('/get-weather', (req, res) => {
  let address = req.body.address;
  if (!address) {
    return res.send('Please specify an address');
  }
  if (address) {
    geocode(address, (error, {longitude, latitude, location} = {}) => {
      if (error) {
        return res.send({error});
      }
      forecast(longitude, latitude, (e, forecastData) => {
        if (e) {
          return res.send({e});
        }
        res.send({
          location: location,
          data: forecastData
        })
      })
    })
  }
});

app.get('/weather', (req, res) => {
  let address = req.query.address;
  if (!address) {
    return res.send('Please specify an address');
  }
  if (address) {
    geocode(address, (error, {longitude, latitude, location} = {}) => {
      if (error) {
        return res.send({error});
      }
      forecast(longitude, latitude, (e, forecastData) => {
        if (e) {
          return res.send({e});
        }
        res.send({
          location: location,
          data: forecastData
        })
      })
    })
  }
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Deepika'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Please connect with the techinicians!!'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: '404 Error Page'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    message: '404 Error Page'
  })
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})
