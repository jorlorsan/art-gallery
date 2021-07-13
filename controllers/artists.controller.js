const artistsModel = require('../models/artists.model')
const { handleError} = require('../utils/functions');

function getAllArtists(req, res) {
    artistsModel
        .find()
				.populate('artworks', 'title')
        .then((artists) => {
            res.json(artists)
        })
        .catch((err) => handdleError(err, res))
}

function createArtist(req, res){
  console.log(req.body)
  artistsModel
      .create(req.body)
      .then((artist) => {
          res.json(artist)

      })
      .catch((err) => { res.json(err) })
}

function filterArtists(req, res){
    let queryArr = []; 
    if(req.query.artistName){ queryArr.push({ artistName: {'$regex': req.query.artistName, '$options' : 'i' } }) }
    if(req.query.country){ queryArr.push({ country: req.query.country }) }
    artistsModel
      .find({ $or: queryArray })
			.populate('artworks')
      .then((artists) => { 
				res.json(artists);
			})
      .catch((err) => handdleError(err, res))
  }


function getArtist(req, res) {
	artistId = req.params.artistId;
  console.log(artistId)
	artistsModel
		.findById(artistId)
		.populate('artworks')
		.then((artist) => {
			res.json(artist)
		})
		.catch((err) => {res.json(err)})
}


function deleteArtist(req, res){
	artistsModel
		.deleteOne({"_id": req.params.artistId })
		.then((artist) => {
			res.json(artist);
		})
		.catch((err) => handdleError(err, res))
}

function updateArtist(req, res) {
  console.log(req.body)
  artistsModel
	  .findById(req.params.artistId)
    .populate('artworks', 'title')
    .then(artist => {
      artist.artworks.push(req.body.artworks)
      artist.save()
      res.json(artist)
    })
    .catch((err) => handdleError(err, res))
}

function addPublicationToArtist(req, res) {
  console.log(req.params)
  artistsModel
	  .findById(req.params.artistId)
    .then((artist) => {
      artist.publications.push(req.body)
      artist.save()
      res.json(artist)
    })
    .catch((err) => handdleError(err, res))
}


module.exports = { 
    getAllArtists, 
    createArtist,
		filterArtists,
		deleteArtist,
		getArtist,
		updateArtist,
    addPublicationToArtist
}