const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    style: ['styles.css']
  });
});

app.get('/beers', async (req, res) => {
  const rawResponse = await fetch('https://api.punkapi.com/v2/beers');
  const beers = await rawResponse.json();
  res.render('beers', { beers: beers, style: ['beers.css', 'styles.css'] });
});

app.get('/random-beer', async (req, res) => {
  const rawResponseBis = await punkAPI.getRandom();
  res.render('randombeer', {
    rawResponseBis: rawResponseBis,
    style: ['styles.css']
  });
});

app.get('/beers/beer-:id', async (req, res) => {
  // const beerById = await punkAPI.getRandom();
  // res.render('randombeer', { rawResponseBis: rawResponseBis });
  const numId = req.params.id;
  console.log(numId);
  const rawResponseIdBeer = await punkAPI.getBeer(numId);
  console.log(rawResponseIdBeer);
  res.render('beerid', {
    rawResponseIdBeer: rawResponseIdBeer,
    style: ['styles.css']
  });
});

app.listen(3003, () => console.log('🏃‍ on port 3003'));
