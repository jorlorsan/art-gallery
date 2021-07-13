const documentsModel = require('../models/documents.model')
const { handdleError} = require('../utils/functions');

function getAllDocuments(req, res) {
    documentsModel
        .find()
        .populate('artwork','title')
        .populate('artist','artistName')
        .populate('parties', 'name')
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
<<<<<<< HEAD
    let queries = []
    if (req.query.documentType) queries.push({ documentType : {'$regex': req.query.documentType, '$options' : 'i' } })
    if (req.query.price) queries.push({ price : {$lte: parseInt(req.query.price) }})
    documentsModel
      .find({ $or: queries})
=======
    let queryArray=[]
    //req.query.min & req.query.max price: { gt: req.query.min, lte: req.query.max}
    if(req.query.documentType) queryArray.push({ documentType : {'$regex': req.query.documentType, '$options' : 'i' } })
    if(req.query.price) queryArray.push({ price : { $lte: req.query.price } })
    documentsModel
      .find({ $or: queryArray })
>>>>>>> a355335dd9c57bb6cfe56f4da980f69f0637ebc2
      .populate('artworks','title')
      .populate('artist','artistName')
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
    .populate('artist','artistName')
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