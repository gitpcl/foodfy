const fs = require('fs')
const data = require('./data.json')

// PUBLIC EXPORTS
exports.landing = (req, res) => {
    return res.render('landing', { items: data.recipes })
}
exports.about = (req, res) => {
    return res.render('about')
}
exports.recipes = (req, res) => {
    return res.render('recipes', { items: data.recipes })
}
exports.recipe = (req, res) => {
    const recipeIndex = req.params.index

    const recipe = data.recipes.find((recipe) => {
        if (data.recipes.indexOf(recipe) == recipeIndex) {
            return true
        }
    })

    if (!recipe) {
        return res.send("Recipe not found!")
    }

    res.render("recipe", { item: recipe })
    
}

// ADMIN EXPORTS
exports.index = (req, res) => {
    return res.render('admin/index', { items: data.recipes })
}
exports.create = (req, res) => {
    return res.render('admin/create')
}
exports.edit = (req, res) => {
    const { id } = req.params

    const foundRecipe = data.recipes.find((recipe) => {
        return recipe.id == id
    })

    if (!foundRecipe) {
        return res.send("Recipe not found!")
    }

    res.render("admin/edit", { item: foundRecipe })
    
}

// CRUD EXPORTS
// create 
exports.post = (req, res) => {

    const keys = Object.keys(req.body)

    for( key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor preencha todos os campos')
        }
    }

    let { image, title, author, ingredients, preparation, information } = req.body

    const id = Number(data.recipes.length + 1)

    data.recipes.push({
        id, 
        image,
        title,
        author, 
        ingredients, 
        preparation, 
        information
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Erro no arquivo')

        return res.redirect('/admin/recipes')
    })
}
exports.show = (req, res) => {
    const { id } = req.params

    const foundRecipe = data.recipes.find((recipe) => {
        return recipe.id == id
    })

    if (!foundRecipe) {
        return res.send("Recipe not found!")
    }

    return res.render("admin/show", { item: foundRecipe })
    
}
// Update
exports.put = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find((recipe, foundIndex) => {
        if (id == recipe.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) {
        return res.send("Recipe not found!")
    }

    const recipe = {
        ...foundRecipe,
        ...req.body
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write error!')

        return res.redirect(`recipes/${ id }`)
    })
}
// // delete 
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredRecipes = data.recipes.filter((recipe) => {
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}
