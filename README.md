# The Agile Monkeys test nº2

REST API to manage a little shop.

---

## Getting started:

This version can run inside a docker container, let's set it up!

First of all we need to build the image, so let's open a console in the project's folder and type ```docker build -t api_image_name .```, this step might take a while, so while it builds the container we can get the mysql container from dockerhub, let's open another console and type: ```docker pull mysql```

When both of them finish, it's time to start the mysql container, so type: 
```
docker run --name mysql_container_name -e MYSQL_ROOT_PASSWORD=password_at_ormconfig.json -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=crm -d -p port_at_ormconfig.json:3306 mysql/mysql-server:5.7
```

Where "password_at_ormconfig.json" and "port_at_ormconfig.json" are the values specified in ormconfig.json in the fields password and port respectively.

That being done, we can start the container with the api. To do so, type in the console: 
```
docker run --name api_container_name -p 3000:3000 --link mysql_container_name api_image_name
```

Now everything is running, but since the api requires a logged in user, we have to input it directly to the database to be the first admin. Let's do it, get another console and type in: 
```
docker exec -it mysql_container_name mysql -u root -p 
``` 
you will be prompted to input the password you set at ormconfig.json and then you get an instance of mysql, type in:
```
use crm;
INSERT INTO user (name, lastName, userName, password, isAdmin) VALUES ("some name" "some lastname", "admin", "$2b$10$6fgpyVjv9qKmKu4kV1NRWOAG82lFrgtyJttfc2wrzS7bHdw1bUY8.', true");
exit;
```

Now you can log in with userName: admin and password: "1". Make sure to create a new admin user and delete the one you created earlier.

---

## Technologies used:

* Node.js + Express framework:
    Express has a very big comunity of users so it's easy to find information when you can't figure out a way of doing something. I also like the design it encourages.
* TypeScript:
    Helps a lot during the development stage providing typing so you don't make silly mistakes.
* TypeORM:
    A really usefull ORM to connect Node.js with MySQL (or others). It supports MVC design pattern design without too much effort.
* JSONwebtoken & Express-jwt:
    JsonWebToken provides an easy way to create a token using the user information and a salt, it also sets a time limit in which the token can be used before a new login is required. Express-jwt provides an easy way to check if a given token is valid and decodes it to get the user data stored in it.
* Bcrypt:
    This library encrypts any incoming password before saving it to database or compares the incoming password with the encrypted one stored in the database.

---