# Articles RESTful API

- MongoDB with mongoose, NodeJS, EJS

## Structure

| HTTP Request verb |          Route: `/articles` |             Route: `/articles/:title` |
| ----------------- | --------------------------: | ------------------------------------: |
| `GET`             |  Fetch **all** the articles |              Fetch a specific article |
| `POST`            |        Create a new article |                                     - |
| `PUT`             |                           - | Update a specific article (overwrite) |
| `PATCH`           |                           - |     Update a specific article (field) |
| `DELETE`          | Delete **all** the articles |             Delete a specific article |
