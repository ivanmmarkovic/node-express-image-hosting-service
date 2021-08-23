# node-express-image-hosting-service
Image hosting service. Users can create albums and upload images.

### Express, MongoDB
- navigate to project directory
- run npm install
- node index.js

Method | URL | description | access
-------|---- | ------------|--------
GET       |/                                    | show index page              | all
GET       |/login                               | show login page              | all
POST      |/login                               | handle login                 | all
GET       |/signup                              | show signup page             | all
POST      |/signup                              | handle signup                | all
GET       |/albums                              | get all users's albums       | logged users
POST      |/albums                              | create new album             | logged users
GET       |/albums/:albumid                     | get albums with images       | logged users
POST      |/albums/:albumid                     | add image to album           | logged users
DELETE    |/albums/:albumid                     | delete album and images      | logged users

