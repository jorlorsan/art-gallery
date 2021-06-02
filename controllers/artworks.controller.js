const artworksModel = require('../models/artworks.model')

function getAllArtworks (req, res) {
    artworksModel
        .find()
        .populate('artists', 'artistName')
        .then((artworks) => {
          res.json(artworks.map(artwork => (artwork.title + ", " + artwork.year))) 
        })
        .catch((err) => { res.json(err) })
}

function getAllArtworksAuth (req, res) {
  artworksModel
      .find()
      .populate('artists', 'artistName')
      .then((artworks) => { res.json(artworks) })
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
    .populate('artists', 'artistName')
    .then((artwork) => {
        res.json(artwork)
    })
    .catch((err) => handdleError(err, res))
}

function filterArtworks(req, res){
  
  artworksModel
    .find({ $or: [ { year : req.query.year }, { type : {'$regex': req.query.type, '$options' : 'i' }}]} )
    .populate('artists', 'artistName')
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
    })
    .then(artwork => res.json(artwork))
    .catch((err) => handdleError(err, res))
}

module.exports = {
    getAllArtworks, 
    getAllArtworksAuth,
    createArtwork,
    filterArtworks,
    getArtwork,
    deleteArtwork,
    updateArtwork
}