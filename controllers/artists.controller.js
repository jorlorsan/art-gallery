const artistsModel = require('../models/artists.model')
const { handleError} = require('../utils/functions');

function getAllArtists(req, res) {
    artistsModel
        .find()
				.populate('artworks')
        .then((artists) => {
            res.json(artists)
        })
        .catch((err) => handdleError(err, res))
}

function createArtist(req, res){
  //console.log(req.body)
    artistsModel
        .create(req.body)
        .then((artist) => {
            res.json(artist)

        })
        .catch((err) => handdleError(err, res))
}

function filterArtists(req, res){
    let objQuery = {};
    if(typeof req.query.name !== 'undefined'){
      objQuery.name= req.query.name;
    }
    if(typeof req.query.surname !== 'undefined') {
    	objQuery.surname=req.query.surname
    }
    
    if(typeof req.query.alias !== 'undefined') {
    	objQuery.alias = req.query.alias
    }

    artistsModel
      .find(objQuery)
			.populate('artworks')
      .then((artists) => { 
				res.json(artists.map( artist => { 
        return { 
					name: artist.name, 
					surname: artist.surname, 
					alias: artist.alias,
					email: artist.email
				}
				}));
			})
      .catch((err) => handdleError(err, res))
  }


function getArtist(req, res) {
	artistId = req.params.artistId;

	artistsModel
		.findById(artistId)
		.populate('artworks')
		.then((artist) => {
			res.json(artist)
		})
		.catch((err) => handdleError(err, res))
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
  console.log(req.params)
  artistsModel
	  .findByIdAndUpdate(req.params.artistId, req.body, {
      new: true,
      runValidators: true
    }) //returnNewDocument : true
		//save?
    .then(artist => res.json(artist))
    .catch((err) => handdleError(err, res))
}

module.exports = { 
    getAllArtists, 
    createArtist,
		filterArtists,
		deleteArtist,
		getArtist,
		updateArtist

}