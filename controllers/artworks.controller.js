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

function getArtwork(req, res) {
	artworkId = req.params.artworkId;
	artworksModel
    .findById(artworkId)
    .then((artwork) => {
        res.json(artwork)
    })
    .catch((err) => handdleError(err, res))
}

function filterArtworks(req, res){
  
  artworksModel
    .find({"stockNo": req.query.stockNo, "year": req.query.year} )
    .then((artworks) => { 
      res.json(artworks );
    })
    .catch((err) => handdleError(err, res))
}

function deleteArtwork(req, res){
	artworksModel
		.deleteOne({"_id": req.params.artworkId})
		.then((artwork) => {
			res.json(artwork);
		})
		.catch((err) => handdleError(err, res))
}

function updateArtwork(req, res) {
  artworksModel
	  .findByIdAndUpdate(req.params.artworkId, req.body, {
      new: true,
      runValidators: true
    }) //returnNewDocument : true
		//save?
    .then(artwork => res.json(artwork))
    .catch((err) => handdleError(err, res))
}

module.exports = {
    getAllArtworks, 
    createArtwork,
    filterArtworks,
    getArtwork,
    deleteArtwork,
    updateArtwork
}