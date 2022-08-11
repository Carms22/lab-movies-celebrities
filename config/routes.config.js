const router = require("express").Router();
const celebritiesController = require("../controller/celebrities.controller");
const moviesController = require("../controller/movies.controller");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Celebrity's world" });
});

//MOVIES
router.get("/movies/new", moviesController.create);
router.post("/movies", moviesController.doCreate);
router.get("/movies", moviesController.list);
router.get("/movies/:id", moviesController.moviesDetail);

router.get("/movies/:id/edit", moviesController.edit);
router.post("/movies/:id", moviesController.doEdit);

router.post("/movies/:id/delete", moviesController.delete);


//CELEBRITIES
router.get("/celebrities/new", celebritiesController.create);
router.post("/celebrities", celebritiesController.doCreate);

router.get("/celebrities", celebritiesController.list);
router.get("/celebrities/:id", celebritiesController.celebritiesDetail);




module.exports = router;
