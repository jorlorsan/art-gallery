const exhibitionsFairsModel = require('../models/exhibitionsFairs.model')

function getAllExhibitionsFairs(req, res) {
    exhibitionsFairsModel
        .find()
        .populate('artists', 'artistName')
        .populate('artworks', 'title')
        .then((exhibitionFair) => {res.json(exhibitionFair)})
        .catch((err) => { res.json(err) })
}

function getExhibitionFairByTitle (req, res) {
    exhibitionsFairsModel
        .findOne( {"title": req.params.title} )
        .populate('artists', 'artistName')
        .populate('artworks', 'title')
        .then((exhibitionFair) => { res.json(exhibitionFair) })
        .catch((err) => { res.json(err) })
}

function filterExhibitionsFairs (req, res) {

  
   let object = {}
    if(req.query.location) {
        object.location = req.query.location 
    }

   exhibitionsFairsModel
        .find(object) 
        .populate('artworks')
        .populate('artists')
        .then((exhibitionsFairs) => { 

            let result = exhibitionsFairs

            if (req.query.title) result = result.filter( exhibitionFair => {
                return exhibitionFair.artworks.filter(artwork => artwork.title.indexOf(req.query.title) >= 0).length > 0
            })

            if (req.query.artistName) result = result.filter( exhibitionFair => {
                return exhibitionFair.artists.filter( artist => artist.artistName.indexOf(req.query.artistName) >= 0).length > 0 
            })
             
            res.json(result)
            })
        .catch((err) => {res.json(err)})
    }

function createAnExhibitionFair (req, res) {
    exhibitionsFairsModel
    .create(req.body)
    .then((exhibitionFair) => { res.json(exhibitionFair) })
    .catch((err) => { res.json(err) })
}

function updateExhibitionFair(req, res) {
    exhibitionsFairsModel
      .findById(req.params.exhibitionId)
      .populate('artists', 'artistName')
      .populate('artworks', 'title')
      .then(exhibitionFair => {
          exhibitionFair.title = req.body.title
          exhibitionFair.artists.push(req.body.artists)
          exhibitionFair.artworks.push(req.body.artworks)
          exhibitionFair.save()
          res.json(exhibitionFair)
        })
      .catch((err) => {res.json(err) })
  }

module.exports = {
    getAllExhibitionsFairs,
    getExhibitionFairByTitle,
    filterExhibitionsFairs,
    createAnExhibitionFair,
    updateExhibitionFair
}