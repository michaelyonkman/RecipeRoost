# Recipe Roost

A single-page web application to host all of your favorite recipes in one place. Built with React and React Bootstrap for a responsive experience on both desktop and mobile platforms. The app features a relational database utilizing PostgreSQL for searching and sorting results based on recipe name, category, and ingredients.

## Getting Started:

To use Recipe Roost from GitHub fork and clone the repository. In order to run Recipe Roost you will need to have PostgreSQL installed.

Create two postgres databases
`createdb $recipe_roost`
`createdb $recipe_roost-test`

Now that you've got the code and you've created your databases run `npm install`. You can also run `npm run seed` to populate the database with some dummy users and recipes.

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.







