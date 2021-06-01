const documentsModel = require('../models/documents.model')
const { handdleError} = require('../utils/functions');

function getAllDocuments(req, res) {
    documentsModel
        .find()
        .populate('artworks','title')
        .populate('artist','title')
        .then((documents) => {
            res.json(documents)
        })
        .catch((err) => handdleError(err, res))
}


function createDocument(req, res){
  console.log(req.body)
  documentsModel
    .create(req.body)
    .then((document) => {
      res.json(document)
    })
    .catch((err) => handdleError(err, res))
  }

  function filterDocuments(req, res){
    documentsModel
      .find()
      .populate('artworks','title')
      .populate('artist','title')
	    .then((documents) => { 
				res.json(documents);
			})
      .catch((err) => handdleError(err, res))
  }

function getDocument(req, res) {
  documentId = req.params.documentId;
  documentsModel
    .findById(documentId)
    .populate('artworks','title')
    .populate('artist','title')
    .then((document) => {
      res.json(document)
    })
    .catch((err) => handdleError(err, res))
}

function deleteDocument(req, res){
	documentsModel
		.deleteOne({"_id": req.params.documentId })
		.then((document) => {
			res.json(document);
		})
		.catch((err) => handdleError(err, res))
}

function updateDocument(req, res) {
  documentsModel
	  .findByIdAndUpdate(req.params.documentId, req.body, {
      new: true,
      runValidators: true
    }) //returnNewDocument : true
		//save?
    .then(document => res.json(document))
    .catch((err) => handdleError(err, res))
}

module.exports = { 
    getAllDocuments, 
    createDocument,
    filterDocuments,
    deleteDocument,
    getDocument,
    updateDocument
}