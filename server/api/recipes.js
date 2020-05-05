const router = require('express').Router()
const {Recipe} = require('../db/models')
module.exports = router

router.get('/:recipeId', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId)
    res.json(recipe)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const recipe = {
    name: req.body.recipeName,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    category: req.body.category,
    rating: req.body.rating,
    userId: req.body.userId
  }
  try {
    const newRecipe = Recipe.create(recipe)
    res.send(newRecipe)
  } catch (err) {
    next(err)
  }
})
