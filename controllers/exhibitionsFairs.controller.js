const exhibitionsFairsModel = require('../models/exhibitionsFairs.model')

function getAllExhibitionsFairs(req, res) {
    exhibitionsFairsModel
        .find()
        .populate('artists', 'artistName')
        .populate('artworks', 'title')
        .then((exhibitionFair) => {res.json(exhibitionFair)})
        .catch((err) => { res.json(err) })
}

function getExhibitionFairById (req, res) {
    exhibitionId = req.params.exhibitionId;
    exhibitionsFairsModel
        .findById( exhibitionId )
        .populate('artists', 'artistName')
        .populate('artworks', 'title')
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
   let object = {}
    if(req.query.location) {
        object.location = req.query.location 
    }

   exhibitionsFairsModel
        .find(object) 
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
    getExhibitionFairById,
    filterExhibitionsFairs,
    createAnExhibitionFair,
    updateExhibitionFair
}