const controller = require('../controller/pokemonController')

const express = require('express') 

const router = express.Router()

router.get("/catalogo", controller.getAll)

router.put("/:id", controller.updatePokemon)

router.patch("/:id", controller.updateStats)

router.delete("/:id", controller.deletePokemon)

router.delete("/:type", controller.deletePokemonPorType)

module.exports = router