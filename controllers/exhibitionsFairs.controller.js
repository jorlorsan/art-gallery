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
        .then((exhibitionFair) => { res.json(exhibitionFair) })
        .catch((err) => { res.json(err) })
}

function filterExhibitionsFairs (req, res) {
    console.log("HOLAAAAAAA", req.query)

    /*let queryArray = []
    const queryKeys = Object.keys(req.query) 
    queryKeys.forEach( (query) => {
        
        let obj = {}
        const key = `${query}`
        obj[key] = { "$regex": req.query[query] , "$options": "i"}
        queryArray.push(obj)
    } )
    console.log(queryArray)
    
    Dentro del find: {
        "$and": queryArray 
    }
    */

   exhibitionsFairsModel
        .find({location: req.query.location}) 
        .populate('artworks', 'title')
        .populate('artists', 'artistName')
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
        .findByIdAndUpdate(req.params.exhibitionId, req.body, {
        new: true,
        runValidators: true
      })
      .then(exhibitionFair => res.json(exhibitionFair))
      .catch((err) => {res.json(err, res) })
  }

module.exports = {
    getAllExhibitionsFairs,
    getExhibitionFairByTitle,
    filterExhibitionsFairs,
    createAnExhibitionFair,
    updateExhibitionFair
}