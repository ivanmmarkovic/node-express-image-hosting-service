# node-express-image-hosting-service
Image hosting service. Users can create albums and upload images.

### Express, MongoDB
- in project directory run
    - docker-compose up --build
- in api directory run
    - npm install
    - node index.js
- Visit [http://localhost:5000](http://localhost:5000)

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

