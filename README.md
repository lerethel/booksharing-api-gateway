This is a work-in-progress booksharing app API based on the microservice architecture. The API is written in TypeScript using NestJS.

# Microservices

- [The catalog microservice](https://github.com/lerethel/booksharing-api-catalog). Uses PostgreSQL as a database, managed via MikroORM
- [The user management microservice](https://github.com/lerethel/booksharing-api-user). Uses a different instance of PostgreSQL, which is also managed via MikroORM
- [The authorization microservice](https://github.com/lerethel/booksharing-api-auth). Uses Redis, managed via Keyv, to store session IDs

# Routes

## Catalog

All the catalog routes follow the same pattern. The dates should be in the "yyyy-mm-dd" format.

All the requests except GET ones require the user to be logged in.

`GET /author|book|bookcopy|genre`

- Creates a new instance of the specified entity
- Requires the following JSON objects:
  - for author: `{ firstName: string, lastName: string, birthDate: string, deathDate?: string }`
  - for book: `{ title: string, summary: string, author: number, genres: number[] }`
  - for bookcopy: `{ edition: string, book: number }`
  - for genre: `{ name: string }`
- Returns the newly created entity. A bookcopy will also have `status: Available` and `owner: number` properties, the latter of which contains the current user's id

`GET /author|book|bookcopy|genre`

- Returns all the specified entities

`GET /author|book|bookcopy|genre/:id`

- Returns the specified entity
- Optionally accepts a `populate` parameter, which provides related information. The accepted values are (multiple values must be separated by commas):
  - for author: `books`
  - for book: `genres`, `copies`, `author`
  - for bookcopy: `book`
  - for genre: `books`

`PUT /author|book|bookcopy|genre/:id`

- Updates the specified entity
- Requires the same JSON objects as `POST` does
- Returns the updated entity

`DELETE /author|book|bookcopy|genre/:id`

- Deletes the specified entity
- Returns an empty 200 response

`PATCH /bookcopy/:id/loan`

- Marks the specified bookcopy as loaned
- Returns an empty 200 response

`PATCH /bookcopy/:id/return`

- Marks the specified bookcopy as returned
- Returns an empty 200 response

## User

`POST /user/create`

- Creates a new user account
- Requires the following JSON object: `{ name: string, email: string, password: string }`
- Returns the newly created account without the `password` property

`PUT /user/name`

- Changes the current user's name
- Requires the following JSON object: `{ name: string }`
- Returns an empty 200 response

`PUT /user/email`

- Changes the current user's email
- Requires the following JSON object: `{ email: string, password: string }`
- Returns an empty 200 response

`PUT /user/password`

- Changes the current user's password
- Requires the following JSON object: `{ password: string, new-password: string, new-password-confirmed: string }`
- Returns an empty 200 response

`POST /user/delete`

- Deletes the current user's account
- Requires the following JSON object: `{ password: string }`
- Returns an empty 200 response

## Auth

`POST /auth/login`

- Logs a user in to the app
- Requires the following JSON object: `{ email: string, password: string }`
- Returns an empty 200 response and a cookie with the user's session ID

`POST /auth/logout`

- Logs the current user out of the app
- Returns an empty 200 response
