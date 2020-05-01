'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Recipe} = require('../server/db/models')
const faker = require('faker')

let fakeRecipes = []
function generateRecipes() {
  for (let i = 0; i <= 20; i++) {
    let name = faker.hacker.adjective()
    let ingredients = faker.lorem.words()
    let instructions = faker.lorem.words()
    let imageURL = faker.image.imageUrl()
    let category = faker.lorem.word()
    let rating = faker.random.number(5)
    let userId = faker.random.number({min: 1, max: 2})

    fakeRecipes.push({
      name,
      ingredients,
      instructions,
      imageURL,
      category,
      rating,
      userId
    })
  }
}

generateRecipes()

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  // const recipes = await Promise.all([
  //   Recipe.create({
  //     name: 'Hearty Beef Lasagna',
  //     ingredients: 'Noodles, Beef, Cheese, Tomato Sauce',
  //     instructions: 'Put it all together and bake it',
  //     imageURL:
  //       'http://www.cooktasteshare.com/uploads/2/0/8/7/20877738/screen-shot-2017-01-18-at-8-09-05-am_orig.jpg',
  //     category: 'Main Course',
  //     rating: 5,
  //     userId: 2
  //   }),
  //   Recipe.create({
  //     name: 'Tomato Soup',
  //     ingredients: 'Tomatoes, Cream, Salt',
  //     instructions: 'Put it all together and cook on stove until hot',
  //     category: 'Soup',
  //     rating: 4,
  //     userId: 1
  //   })
  // ])

  const recipes = await Promise.all(
    fakeRecipes.map(recipe => Recipe.create(recipe))
  )
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${recipes.length} recipes`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
