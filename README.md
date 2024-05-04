# Keeper App Backend

## Technologies/Frameworks/Libraries

This is a Express.js server for a notes application that stores notes for registered users and lets them create new notes, edit existing notes, and delete existing notes.

Uses CORS to work with a React frontend.

Database for notes: MongoDB with Mongoose as the ODM

The server is set up to use the `cors` and `express.json` middleware. The `cors` middleware is configured with specific options to handle cross-origin requests, and `express.json` is used to parse JSON payloads in requests.



## How to Run Locally

### Setup

To install the dependencies listed in `package.json`, run `npm install`.

Create a `.env` file in the project directory containing the following key:

- `MONGO_DB_URI`: with the URI to your MongoDB database



In the project directory, you can run:

### `npm start`

Runs the server at http://localhost:8888.


### `npm dev`

Runs the server at http://localhost:8888 with nodemon to restart automatically upon any changes.

`index.js` is the point of entry when running locally and `api/index.js` is the point of entry in the Vercel deployment.

## Deployment

Deployed on Vercel: https://note-backend-chi.vercel.app

Vercel deployment configured to only handle cross-origin requests from "[https://keeper-fc.vercel.app"](vscode-file://vscode-app/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).

## API Endpoints

### GET /notes/:id

This endpoint retrieves all notes associated with a specific user ID.

#### Request

- Method: GET
- URL: `/notes/:id`
- Parameters:
  - `id` (in URL): The user ID to retrieve notes for.

#### Response

- Success (200 OK):
  - Content-Type: `application/json`
  - Body: Array of JSON objects, each representing a note.
- Failure (500 Internal Server Error):
  - Content-Type: `application/json`
  - Body: JSON object containing an `error` property with information about the error that occurred.

### POST /notes/

This endpoint creates a new note.

#### Request

- Method: POST
- URL: `/notes/`
- Body: JSON object containing the following properties:
  - `title`: The title of the note.
  - `content`: The content of the note.
  - `uid`: The user ID of the note owner.

#### Response

- Success (201 Created):
  - Content-Type: `application/json`
  - Body: JSON object containing a `message` property with the value "Note created", and a `createdNote` property with the created note.
- Failure (500 Internal Server Error):
  - Content-Type: `application/json`
  - Body: JSON object containing an `error` property with information about the error that occurred.

### PATCH /notes/:id

This endpoint updates a note with the specified ID.

#### Request

- Method: PATCH
- URL: `/notes/:id`
- Parameters:
  - `id` (in URL): The ID of the note to update.
- Body: JSON object containing the updated note.

#### Response

- Success (200 OK):
  - Content-Type: `application/json`
  - Body: JSON object representing the result of the update operation.
- Failure (500 Internal Server Error):
  - Content-Type: `application/json`
  - Body: JSON object containing an `error` property with information about the error that occurred.

### DELETE /notes/:id

This endpoint deletes a note with the specified ID.

#### Request

- Method: DELETE
- URL: `/notes/:id`
- Parameters:
  - `id` (in URL): The ID of the note to delete.

#### Response

- Success (200 OK):
  - Content-Type: `application/json`
  - Body: JSON object representing the result of the delete operation.
- Failure (500 Internal Server Error):
  - Content-Type: `application/json`
  - Body: JSON object containing an `error` property with information about the error that occurred.

## Acknowledgements

- Professor Shoaib Ahamed and all the TA’s of COMS 3102 (Shivam, Raghad, and Ahmed)
- Shivam Shekhar’s walkthrough
- CodingGarden’s Video: https://www.youtube.com/watch?v=B-T69_VP2Ls&ab_channel=CodingGarden on deploying on Vercel

## Author

Faustina Cheng