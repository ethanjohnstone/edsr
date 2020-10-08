var express = require('express');
var router = express.Router();
var controller = require("../controllers/user.controller");

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post("/", controller.create);
router.put("/updatebyid", controller.updateById);

router.delete("/delete", controller.delete);

module.exports = router;
