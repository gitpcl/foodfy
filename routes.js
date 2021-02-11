const express = require('express')
const recipes = require('./data')
const routes = express.Router()

routes.get("/", function(req, res) {
    return res.render('landing', { items: recipes })
})

routes.get("/about", function(req, res) {
    return res.render('about')
})

routes.get("/recipes", function(req, res) {
    return res.render('recipes', { items: recipes })
})

routes.get("/recipe", function (req, res) {
    const id = req.query.id

    const recipe = recipes.find(function(recipe){
        if (recipe.id == id) {
            return true
        }
    })

    if (!recipe) {
        return res.send("Recipe not found!")
    }

    res.render("recipe", { item: recipe })
})

module.exports = routes