var express = require('express');
var router = express.Router();
var user = require("../controllers/user.controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/", user.create);
router.put("/updatebyid", user.updateById);

router.delete("/delete", user.delete);

module.exports = router;
