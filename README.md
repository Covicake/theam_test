# The Agile Monkeys test nº2

REST API to manage a little shop.

---

##Getting started:

All you need to do to run the server is install the dependencies with: npm install and then start the server with npm run start.

The database information is stored in 'ormconfig.json' at the projects root, I didn't upload that file, but you can build your own [following this instructions](http://typeorm.io/#/using-ormconfig/)


TODO:

* Users can manage customers
    * Customers have name, surname and Id as required information
    * Customers can have an image, when queried they provide the image url.
    * Users can create, edit and delete customers.
    * Users can view a list of customers
    * Customers store information of the user who created them and the last user who updated them.
* Admin condition
    * Admins can manage users (create, update, delete).
    * Admins can provide or revoke admin rights to users.

DONE:

* User authentication
* Users database
* Customers database