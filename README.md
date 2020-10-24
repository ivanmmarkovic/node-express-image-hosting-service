# node-express-image-hosting-service
Image hosting service. Users can create albums and upload images.

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


![Index page](https://raw.githubusercontent.com/ivanmmarkovic/node-express-image-hosting-service/main/project%20images/1.png){width="50%"}

Login and signup forms have data validation.

![Sign up page](https://raw.githubusercontent.com/ivanmmarkovic/node-express-image-hosting-service/main/project%20images/2.png)

![Sign up page](https://raw.githubusercontent.com/ivanmmarkovic/node-express-image-hosting-service/main/project%20images/3.png)

![Sign up page](https://raw.githubusercontent.com/ivanmmarkovic/node-express-image-hosting-service/main/project%20images/4.png)

New album is created with Ajax, and if request was successful, link for created album is added to albums page.

![Albums page](https://raw.githubusercontent.com/ivanmmarkovic/node-express-image-hosting-service/main/project%20images/5.png)

User can't create albums with same name.

![Albums page](https://raw.githubusercontent.com/ivanmmarkovic/node-express-image-hosting-service/main/project%20images/6.png)

User can upload only images. 

![Albums page](https://raw.githubusercontent.com/ivanmmarkovic/node-express-image-hosting-service/main/project%20images/7.png)

Album can't contains images with same titles.

When user delete album, images will be deleted too.

![Albums page](https://raw.githubusercontent.com/ivanmmarkovic/node-express-image-hosting-service/main/project%20images/9.png)
