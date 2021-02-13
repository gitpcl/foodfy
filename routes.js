const express = require('express')
const recipes = require('./data')
const routes = express.Router()

// Public routes
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

// Admin routes
routes.get("/admin/recipes", (req, res) => {
    return res.render('admin/index', { items: recipes })
})

routes.get("/admin/recipes/create", (req, res) => {
    return res.render('admin/create')
})


routes.get("/admin/recipes/:index", (req, res) => {
    const recipeIndex = req.params.index

    const recipe = recipes.find((recipe) => {
        if (recipes.indexOf(recipe) == recipeIndex) {
            return true
        }
    })

    if (!recipe) {
        return res.send("Recipe not found!")
    }

    res.render("admin/show", { item: recipe })
    
})

routes.get("/admin/recipes/:index/edit", (req, res) => {
    const recipeIndex = req.params.index

    const recipe = recipes.find((recipe) => {
        if (recipes.indexOf(recipe) == recipeIndex) {
            return true
        }
    })

    if (!recipe) {
        return res.send("Recipe not found!")
    }

    res.render("admin/edit", { item: recipe })
    
})

// routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
// routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
// routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
// routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita

// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

module.exports = routes