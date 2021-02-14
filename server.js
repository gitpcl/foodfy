const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended: true })) // makes req.body works
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)
server.use((req, res) => {
    res.status(404).render("not-found");
});

server.set('view engine', 'njk')

nunjucks.configure('views', { 
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function() {
    console.log("server is running")
})