const createError = require("http-errors")
const Celebrity = require("../models/Celebrity.model");

//READ
module.exports.list = (req, res, next) =>{
  Celebrity.find()
    //.populate("movies")
    .then((celebrities) => {
      res.render("celebrities/list", {celebrities})
    })
    .catch(next)
};

module.exports.celebritiesDetail = (req, res, next) => {
  const {id} = req.params;
  Celebrity.findById(id)
    // .populate({
    //   path: "movies",
    //   populate: {
    //     path:"celebrity",
    //   }
    // })
    .then((celebrity) => {
      res.render("celebrities/detail", { celebrity })
    })
    .catch(err => {
      next(createError(404, "Author not found"))
    })
}

module.exports.create = (req, res, next) => {
  res.render("celebrities/form")
}

module.exports.doCreate = (req, res, next) => {
  Celebrity.create(req.body)
    .then((createdCelebrity) => {
      res.redirect("/celebrities")
    })
    .catch( err => next(err))
}
