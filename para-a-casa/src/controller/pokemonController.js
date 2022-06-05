const pokedexJson = require('../models/pokedex.json')

const express = require('express')

//executar o express
const app = express()

//fazendo o body parser
app.use(express.json()) 

const getAll = (request, response) => {

    response.status(200).json([
        {
            "pokemon" : pokedexJson
        }
    ])
}

//Alterar todas as informações do pokemon buscando pelo id
const updatePokemon = (request, response) => {

    const idRequest = request.params.id 
    let pokemonRequest = request.body

    //o Index Retorna o indice do array no primeiro elemento que for true
    let indexEncontrado = pokedexJson.findIndex(pokemon => pokemon.id == idRequest)

    //Splice remove um elemento a partir do indexEncontrado. E no lugar dele é colocado a request passada (pokemonRequest) 
    pokedexJson.splice(indexEncontrado, 1, pokemonRequest)

    //Mando uma response dizendo que está tudo correto e envio o filme com a alteração
    response.status(200).json([{
        "mensagem": "seu pokemon foi atualizado",
        pokedexJson
        //se quiser que retorne apenas o pokemon alterado, teria que ter sido criada uma variavel em pokemonJson.splice
    }])
}

//Atualizar o stats do pokemon buscando pelo id
const updateStats = (request, response) => {

    /*guardo o id que foi enviado no request na constante idRequest (pq params? pq id é especifico e eu uso params para buscas especificas)*/
    const idRequest = request.params.id

    /*guardo o titulo que foi enviado no body da requisiçao (pq body? pq pra put, patch e post eu PRECISO passar um body)*/
    let novoStats = request.body.stats

   //preciso filtrar o meu "banco de dados" (nesse caso é o Json mockado) para encontrar o id que o usuário digitou
   pokemonFiltrado = pokedexJson.find(pokemon => pokemon.id == idRequest)

   //Uma parte especifica do filme, no caso o título, será alterada com a nova informação enviada (o novo titulo)
    pokemonFiltrado.stats = novoStats

    //Mando uma response dizendo que está tudo correto e envio o filme com a alteração
    response.status(200).json([{
        "mensagem": "seu stats foi atualizado",
        pokemonFiltrado
    }])
}

//Deletar um pokemon por id
const deletePokemon = (request, response ) => {

    //id que quero deletar
    const idRequest = request.params.id

    //Pegar o index(indice) do pokemon que será deletado
    const indexPokemon = pokedexJson.findIndex( pokemon => pokemon.id == idRequest)

    //retira o pokemon do array de pokemon a partir do index indicado
    //array.splice(index, numero de coisas que serão deletadas, item que vou adicionar)
    
    pokedexJson.splice(indexPokemon, 1) //pra deletar não precisa adicionar nenhum item

    response.status(200).json([{
        "mensagem" : "O pokemon foi deletado",
        "deletado" : idRequest,
        pokedexJson
    }])
}

//Deletar um pokemon por tipo
const deletePokemonPorType = (request, response ) => {

    //tipo que quero deletar
    const typeRequest = request.params.type.toLowerCase()

    const indexType = pokedexJson.findIndex( pokemon => pokemon.type.includes(typeRequest))

    pokedexJson.splice(indexType,1)

    response.status(200).json([{

        "mensagem" : "O tipo do pokemon foi deletado",
        "deletado" : typeRequest,
        pokedexJson
    }])
}

module.exports = {
    getAll,
    updatePokemon,
    updateStats,
    deletePokemon,
    deletePokemonPorType
}