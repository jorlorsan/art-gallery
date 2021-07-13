const shipmentsModel = require('../models/shipments.model')
const { handleError} = require('../utils/functions');

function getAllShipments(req, res) {
   shipmentsModel
    .find()
		.populate('artwork', 'title')
    .populate('shipper', 'name')
    .populate('client', 'name')
    .then((shipments) => {
      res.json(shipments)
    })
    .catch((err) => handdleError(err, res))
}

function createShipment(req, res){
  //console.log(req.body)
  shipmentsModel
    .create(req.body)
    .then((shipment) => {
        res.json(shipment)
    })
    .catch((err) => handdleError(err, res))
  }

function filterShipments(req, res){
  let queryArray=[]
  if(req.query.from) queryArray.push({ from : req.query.from })
  if(req.query.to) queryArray.push({ to : req.query.to })
  shipmentsModel
<<<<<<< HEAD
    .find({ $or: [ { from : req.query.from }, { to : req.query.to }]})
    .populate('artwork', 'title')
    .populate('shipper', 'name')
    .populate('client', 'name')
=======
    .find({ $or: queryArray })
    .populate('artworks')
>>>>>>> a355335dd9c57bb6cfe56f4da980f69f0637ebc2
    .then((shipments) => { 
      res.json(shipments)}
    )
    .catch((err) => res.json(err))
}

function getShipment(req, res) {
	shipmentId = req.params.shipmentId;
	shipmentsModel
		.findById(shipmentId)
		.populate('artwork')
    .populate('client')
    .populate('shipper')
		.then((shipment) => {
			res.json(shipment)
		})
		.catch((err) => res.json(err))
}

function deleteShipment(req, res){
	shipmentsModel
		.deleteOne({"_id": req.params.shipmentId })
		.then((shipment) => {
			res.json(shipment);
		})
		.catch((err) => handdleError(err, res))
}

function updateShipment(req, res) {
  console.log(req.params)
  shipmentsModel
	  .findByIdAndUpdate(req.params.shipmentId, req.body, {
      new: true,
      runValidators: true
    }) //returnNewDocument : true
		//save?
    .then(shipment => res.json(shipment))
    .catch((err) => handdleError(err, res))
}

module.exports = { 
  getAllShipments, 
  createShipment,
  filterShipments,
  deleteShipment,
  getShipment,
  updateShipment
}