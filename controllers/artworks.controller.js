const artworksModel = require('../models/artworks.model')

function getAllArtworks (req, res) {
    artworksModel
        .find()
        .populate('artistId', 'artistName')
        .then((artworks) => {
          console.log(artworks)
          res.json(artworks.map(artwork => {
            let artists = artwork.artistId.map(artist => artist.artistName).join(", ")
            return artists + ", " + artwork.title + ", " + artwork.year 
          }))
        })
        .catch((err) => { res.json(err) })
}

function getAllArtworksAuth (req, res) {
  artworksModel
      .find()
      .populate('artistId', 'artistName')
      .populate('exhibitionHistory', 'title')
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
    .populate('artistId', 'artistName')
    .then((artwork) => {
        res.json(artwork.artistId[0].artistName + ", " + artwork.title + ", " + artwork.year)
    })
    .catch((err) => { res.json(err) })
}

function filterArtworks(req, res){
  
  artworksModel
    .find({ $or: [ { year : req.query.year }, { type : {'$regex': req.query.type, '$options' : 'i' }}]} )
    .populate('artistId', 'artistName')
    .populate('exhibitionHistory', 'title')
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
	  .findById(req.params.artworkId)
    .populate('artistId', 'artistName')
    .populate('exhibitionHistory', 'title')
    .then(artwork => {
      artwork.exhibitionHistory.push(req.body.exhibitionHistory)
      artwork.save()
      res.json(artwork)
    })
    .catch((err) => {res.json (err)})
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