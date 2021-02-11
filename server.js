const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', { 
    express: server
})

server.get("/", function(req, res) {
    return res.render('landing', { items: recipes })
})

server.get("/about", function(req, res) {
    return res.render('about')
})

server.get("/recipes", function(req, res) {
    return res.render('recipes', { items: recipes })
})

server.get("/recipe", function (req, res) {
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

server.listen(5000, function() {
    console.log("server is running")
})