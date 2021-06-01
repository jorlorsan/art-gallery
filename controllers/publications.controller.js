const { publicationsModel }= require('../models/publications.model')
const { handdleError} = require('../utils/functions');

function getAllPublications(req, res) {
    publicationsModel
        .find()
        .then((publications) => {
            res.json(publications)
        })
        .catch((err) => handdleError(err, res))
}


function createPublication(req, res){
  //console.log(req.body)
  publicationsModel
    .create(req.body)
    .then((publication) => {
      res.json(publication)
    })
    .catch((err) => handdleError(err, res))
  }


function getPublication(req, res) {
  publicationId = req.params.publicationId;

  publicationsModel
    .findById(publicationId)
    .then((publication) => {
      res.json(publication)
    })
    .catch((err) => handdleError(err, res))
}

function deletePublication(req, res){
	publicationsModel
		.deleteOne({"_id": req.params.publicationId })
		.then((publication) => {
			res.json(publication);
		})
		.catch((err) => handdleError(err, res))
}

function updatePublication(req, res) {
  console.log(req.params)
  publicationsModel
	  .findByIdAndUpdate(req.params.publicationId, req.body, {
      new: true,
      runValidators: true
    }) //returnNewDocument : true
		//save?
    .then(publication => res.json(publication))
    .catch((err) => handdleError(err, res))
}

module.exports = { 
    getAllPublications, 
    createPublication,
    deletePublication,
    getPublication,
    updatePublication

}