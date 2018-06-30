# The Agile Monkeys test nº2

REST API to manage a little shop.

---

## Getting started:

All you need to do to run the server is install the dependencies with: `npm install` and then start the server with `npm run start`.

The database information is stored in 'ormconfig.json' at the projects root, I didn't upload that file, but you can build your own [following this instructions](http://typeorm.io/#/using-ormconfig/)

---

## Technologies used:

* Node.js + Express framework.
    Express has a very big comunity of users so it's easy to find information when you can't figure out a way of doing something. I also like the way the design it encourages.
* TypeScript
    TypeScript helps a lot during the development stage providing typing so you don't make silly mistakes.
* TypeORM
    A really usefull ORM to connect Node.js with MySQL (and others). It supports a MVC pattern design without too much effort.
* Passport middleware for authentication.
    Is easy to use and provides all the functionalities needed in this project. It also supports Oauth2 with most third party providers (Facebook, Google, Twitter...).

---

## Journal:

TODO:

* Encription
    * encrypt password before saving to database.
    * encrypt password before checking with database for login.
    * create .env to store salt for encription.

* Forms
    * Check data types before saving to database.
    * Sanitize data to avoid sql injection

* File uploads
    * Accept only image formats
    * Keep original format
        
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

