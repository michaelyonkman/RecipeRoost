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
