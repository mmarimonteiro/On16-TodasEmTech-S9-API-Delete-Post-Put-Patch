//centralizando o conteúdo da aplicação - Rota raiz
const express = require('express') //importando o express

//importe da continuação das rotas de filmes
const pokemonRoutes = require("./routes/pokemonRoutes")

//executo o express
const app = express() 

//uso o bodyparser
app.use(express.json()) 

//criar uma rota raiz
app.use("/pokemon", pokemonRoutes)

//exportando para usar o server.js
module.exports = app 