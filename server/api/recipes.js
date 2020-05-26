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
    const newRecipe = await Recipe.create(recipe)
    res.send(newRecipe)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const editedRecipe = await Recipe.update(
      {
        name: req.body.recipeName,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        category: req.body.category,
        rating: req.body.rating
      },
      {where: {id: req.body.recipeId}}
    )
    res.send(editedRecipe)
  } catch (err) {
    next(err)
  }
})

router.delete('/:recipeId', async (req, res, next) => {
  try {
    const id = req.params.recipeId
    await Recipe.destroy({where: {id}})
    res.status(200).json({
      message: 'Deleted Successfully',
      id
    })
  } catch (err) {
    next(err)
  }
})
