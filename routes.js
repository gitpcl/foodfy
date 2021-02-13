const express = require('express')
const recipes = require('./data')
const routes = express.Router()

routes.get("/", (req, res) => {
    return res.render('landing', { items: recipes })
})

routes.get("/about", (req, res) => {
    return res.render('about')
})

routes.get("/recipes", (req, res) => {
    return res.render('recipes', { items: recipes })
})

routes.get("/recipes/:index", (req, res) => {
    const recipeIndex = req.params.index

    const recipe = recipes.find((recipe) => {
        if (recipes.indexOf(recipe) == recipeIndex) {
            return true
        }
    })

    if (!recipe) {
        return res.send("Recipe not found!")
    }

    res.render("recipe", { item: recipe })
    
})

routes.use((req, res) => {
    res.status(404).render("not-found");
});

module.exports = routes