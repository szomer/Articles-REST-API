// modules
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const mongoController = require('./controllers/mongoController');
const articlesController = require('./controllers/articlesController');
const articleController = require('./controllers/articleController');

const STATUS_CODES = {
  200: 'OK',
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));

// database connection
mongoController
  .then((Article) => {
    // api controller
    articlesController(app, Article, STATUS_CODES); // /articles
    articleController(app, Article, STATUS_CODES); // /articles/article
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.render('index');
});

// listen to port
app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});
