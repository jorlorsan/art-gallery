const shipmentsModel = require('../models/shipments.model')
const { handleError} = require('../utils/functions');

function getAllShipments(req, res) {
   shipmentsModel
    .find()
		.populate('artworks') //revisar
    .populate('contacts')
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
  let objQuery = {};

  if(typeof req.query.from !== 'undefined'){
    objQuery.from= req.query.from;
  }
  /*if(typeof req.query.to !== 'undefined'){
    objQuery.to= req.query.to;
  }*/
  shipmentsModel
    .find(objQuery)
    .populate('artworks')
    .then((shipments) => { 
      res.json(shipments.map( shipment => { 
      return { 
        shipmentNo: shipment.title, 
        from: shipment.from, 
        to: shipment.to,
        departure: shipment.departure,
        artworks: shipment.artworks
      }
      }));
    })
    .catch((err) => handdleError(err, res))
}

function getShipment(req, res) {
	shipmentId = req.params.shipmentId;
	shipmentsModel
		.findById(shipmentId)
		.populate('artworks')
    .populate('contacts')
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