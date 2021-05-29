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

  function filterPublications(req, res){
    
    let objQuery = {};
    if(typeof req.query.author !== 'undefined'){
      objQuery.author= req.query.author;
    }
    if(typeof req.query.title !== 'undefined') {
    	objQuery.title=req.query.title
    }
    publicationsModel
      .find(objQuery)
	    .then((publications) => { 
				res.json(publications.map( publication => { 
        return { 
					title: publication.title, 
					author: publication.author, 
					year: publication.year,
					condition: publication.condition
				}
				}));
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
    filterPublications,
    deletePublication,
    getPublication,
    updatePublication

}