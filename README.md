# The Agile Monkeys test nº2

REST API to manage a little shop.

---

## Getting started:

All you need to do to run the server is install the dependencies with: `npm install` and then start the server with `npm run start`.

The database information is stored in 'ormconfig.json' at the projects root, I didn't upload that file, but you can build your own [following this instructions](http://typeorm.io/#/using-ormconfig/)

The encryption needs a secret string, which you have to provide in the file ./config.ts with the following this format:
```
module.exports = {
    secret = 'YOURSECRETSTRING'
};
```

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

## Journal:

TODO:

* File uploads
    * Accept only image formats

DOING:

DONE:

* User authentication
* Users database
* Customers database
* Users can manage customers
    * Customers have name, surname and Id as required information
    * Users can view a list of customers
    * Users can create, edit and delete customers.
    * Customers can have an image, when queried they provide the image url.
    * Customers store information of the user who created them and the last user who updated them.
* Admin condition
    * Admins can manage users (create, update, delete).
    * Admins can provide or revoke admin rights to users.
* Encription
    * create config.ts to store salt for encryption.
    * encrypt password before saving to database.
    * encrypt password before checking with database for login.
    * create config.ts to store salt for encryption.
* Forms
    * Check data types before saving to database.
* File uploads
    * Keep original format