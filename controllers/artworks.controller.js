const artworksModel = require('../models/artworks.model')

function getAllArtworks (req, res) {

    artworksModel
        .find()
        .then((artworks) => {res.json(artworks)})
        .catch((err) => { res.json(err) })
}

function createArtwork (req, res) {
    
    artworksModel
        .create(req.body)
        .then((artwork) => {res.json(artwork)})
        .catch((err) => { res.json(err) })
}

module.exports = {getAllArtworks, createArtwork}