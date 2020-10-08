const express = require('express');
const router = express.Router();

let controller = require("../controllers/temp.controller");

router.get("/", (req, res, next) => {
    res.send("respond with a resource");
})

router.post("/", controller.create);
router.put("/updatebyid", controller.updateById);
router.delete("/delete", controller.delete);

module.exports = router;