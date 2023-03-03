# Articles REST API

RESTful API to handle articles created with NodeJS, MongoDB(mongoose), EJS.

Examples accessable through your browser (Render hosting service - app goes to sleep while inactive) :
- [Overview](https://articles-rest-api.onrender.com/)
- [GET /articles](https://articles-rest-api.onrender.com/articles)
- [GET /articles/Painter](https://articles-rest-api.onrender.com/articles/Painter)

## Structure

The endpoints:

| HTTP Request verb |          Route: `/articles` |             Route: `/articles/:title` |
| ----------------- | --------------------------: | ------------------------------------: |
| `GET`             |  Fetch **all** the articles |              Fetch a specific article |
| `POST`            |        Create a new article |                                     - |
| `PUT`             |                           - | Update a specific article (overwrite) |
| `PATCH`           |                           - |     Update a specific article (field) |
| `DELETE`          | Delete **all** the articles |             Delete a specific article |
