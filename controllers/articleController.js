const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// API for /articles/article
module.exports = function (app, Article, STATUS_CODES) {
  app
    .route('/articles/:articleTitle')

    // GET all articles
    .get((req, res) => {
      // Find a specific article
      Article.findOne({ title: req.params.articleTitle })
        .then((article) => {
          if (article) {
            console.log('[FIND]', article);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(article, null, 2));
          } else {
            sendError(res, STATUS_CODES, 404, 'Article does not exist.');
          }
        })
        .catch((e) => {
          console.log(e);
          sendError(
            res,
            STATUS_CODES,
            500,
            'A problem occured while trying to request the article.'
          );
        });
    })

    // PUT (UPDATE) an article
    .put(urlencodedParser, (req, res) => {
      // update article in db
      Article.updateOne(
        { title: req.params.articleTitle },
        { $set: { title: req.body.title, content: req.body.content } },
        { upsert: true }
      )
        .then((updated) => {
          console.log('[UPDATE]', updated);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updated, null, 2));
        })
        .catch((e) => {
          console.log(e);
          sendError(
            res,
            STATUS_CODES,
            500,
            'A problem occured while trying to update(put) the article.'
          );
        });
    })

    // PATCH (UPDATE) an article
    .patch(urlencodedParser, (req, res) => {
      // update article in db
      Article.updateOne(
        { title: req.params.articleTitle },
        { $set: req.body },
        { upsert: true }
      )
        .then((updated) => {
          console.log('[UPDATE]', updated);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updated, null, 2));
        })
        .catch((e) => {
          console.log(e);
          sendError(
            res,
            STATUS_CODES,
            500,
            'A problem occured while trying to update(patch) the article.'
          );
        });
    })

    // DELETE an article
    .delete((req, res) => {
      console.log(req.params.articleTitle);
      Article.deleteOne({ title: req.params.articleTitle })
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
