const express = require('express')
const data = require('./data')
const recipes = require('./recipes')
const routes = express.Router()

// Public routes
routes.get("/", recipes.landing)
routes.get("/about", recipes.about)
routes.get("/recipes", recipes.recipes)
routes.get("/recipes/:index", recipes.recipe)

// Admin routes
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show) 
routes.get("/admin/recipes/:id/edit", recipes.edit)

// Admin CRUD ops
routes.post("/admin/recipes", recipes.post) 
routes.put("/admin/recipes", recipes.put); 
routes.delete("/admin/recipes", recipes.delete)

module.exports = routes