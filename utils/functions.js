module.exports = {
    handdleError
  }
  
function handdleError(err, res) { return res.status(400).json(err); }