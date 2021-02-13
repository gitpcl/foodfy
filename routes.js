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
// routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
// routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
// routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
// routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

// routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

// 404 route
routes.use((req, res) => {
    res.status(404).render("not-found");
});

module.exports = routes