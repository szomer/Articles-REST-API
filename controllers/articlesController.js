const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// API for /articles
module.exports = function (app, Article, STATUS_CODES) {
  app
    .route('/articles')

    // GET all articles
    .get((req, res) => {
      // find articles
      Article.find({})
        .then((articles) => {
          console.log('[FIND]', articles.length, 'articles');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(articles, null, 2));
        })
        .catch((e) => {
          console.log(e);
          sendError(
            res,
            STATUS_CODES,
            500,
            'A problem occured while trying to request articles.'
          );
        });
    })

    // POST an article
    .post(urlencodedParser, (req, res) => {
      // create new Article object
      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
      });
      // insert Article into the db
      newArticle
        .save()
        .then((article) => {
          console.log('[INSERT]', article);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(article, null, 2));
        })
        .catch((e) => {
          console.log(e);
          sendError(
            res,
            STATUS_CODES,
            500,
            'A problem occured while trying to save the article.'
          );
        });
    })

    // DELETE all articles
    .delete((req, res) => {
      Article.deleteMany()
        .then((deleted) => {
          console.log('[DELETE]', deleted);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(deleted, null, 2));
        })
        .catch((e) => {
          console.log(e);
          sendError(
            res,
            STATUS_CODES,
            500,
            'A problem occured while trying to delete articles.'
          );
        });
    });
};

function sendError(res, STATUS_CODES, code, msg) {
  res.writeHead(code, { 'Content-Type': 'text/plain' });
  res.end(`[ERROR ${code} ${STATUS_CODES[code]}]\n${msg}`);
}
