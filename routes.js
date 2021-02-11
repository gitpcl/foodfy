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

routes.get("/recipes-list", function(req, res) {
    return res.render('recipes-list', { items: recipes })
})

routes.get("/recipe-detail", function(req, res) {
    return res.render('recipe-detail', { items: recipes })
})

routes.get("/recipes-edit", function(req, res) {
    return res.render('recipes-edit', { items: recipes })
})

routes.get("/recipe-create", function(req, res) {
    return res.render('recipe-create', { items: recipes })
})

module.exports = routes