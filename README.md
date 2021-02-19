# MyFlix-Movie-app
MyFlix is a Movie web application which provides users with the access to information about different movies, directors and genres. Using React, build client-side based on existing server-side code (REST API) and MongoDB database.

The building process can be devided into parts: 
- on the server-side: create a database of movies and users (a REST API) with Node.js 
- on the client-side: create the interface for users allowing them to make requests to, and receiving responses from, the server side.

First building the backend for MyFlix Movie App using MongoDB and mongoDB atlas to create and host a small API of movies. 
Then built a react application to create an interactive front-end. 

The front-end of MyFlix-Movie_App is hosted online in the same domain as myFlix REST API: Heroku.

Technologies used: MERN Stack, MongoDB and mongoDB atlas, Redux and Flux.

## Features

- Allows users to see a list of all movies in the database
- Allows users to get detailed information about a single movie by movie title
- Allows users to get detailed information about a genre by genre name
- Allows users to get detailed information about a director by name
- Allows new users to create an user account
- Allows existing users to update their user info or to delete their account
- Allows existing users to add or remove movies to/from their list of favorites

For more information about each endpoint and data that is requestet and responded see *documentation.hmtl*.

## Dependencies
*Back-End*   | *Front-End*
------------ | -------------
bcryptjs | axios
cors | body-parser
jsonwebtoken | lodash
mongoose | prop
morgan | prop-types
passport | re
passport-jwt | react-bootstrap
passport-local | react-redux 
body-parser | react
core-js | react-dom
dotenv | react-router-dom
express | redux
express-validator |
react |  
react-dom | 
react-router-dom | 
uuid | 
