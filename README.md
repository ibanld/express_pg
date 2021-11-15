# Node JS Backend Template with EXPRESS and POSTGRES
## Dependencies
This app uses the following dependencies:
- bcryptjs
- body-parser   
- cookie-parser   
- cors   
- dotenv   
- express   
- express-session  
- pg   
- pg-hstore   
- sequelize   

## Endpoints

### Route to retrive all registered users (PRIVATE)
> GET http://localhost:5000/api/v1/users
### Retrive one user with the given ID (PRIVATE)
> GET http://localhost:5000/api/v1/users/:id
### Create new user with email as username and password (PUBLIC)
> POST http://localhost:5000/api/v1/users/register
### Update user information by given ID (PRIVATE)
> PUT http://localhost:5000/api/v1/users/:id
### Delete user with the given ID from the database (PRIVATE)
> PUT http://localhost:5000/api/v1/users/:id
### Login User (PUBLIC)
> POST http://localhost:5000/api/v1/auth/login
### Logout User (PRIVATE)
> GET http://localhost:5000/api/v1/auth/logout

##### *Private routes use a middleware to check if session is valid @ /middlware/checkSession.js
 
## Environment Variables
### Create a new .env file in the root directory of the app and add the following variables
- PG_URI: Postgres database connection URI
- PG_USER: Postgres database user
- PG_PASSWORD: Postgres database password
- PG_HOST: Postgress database server host
- SESSION_SECRET: Express session secret
- COOKIE_NAME: Session cookie name
- COOKIE_SECRET: Session cookie secret

## Client installation
Create a folder in the root directory named ```client``` and install the client of your choice. Remember that ```CORS``` is enabled and only allows access to same site or PORT 3000. Change it as neccesary @ server.js (line 12).