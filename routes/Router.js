const express = require('express');
const router = express()

// rotas - cria as rotas com os nomes descritos
router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"))

// test route
router.get("/", (req, res) => {
    res.send("API IS WORKING!")
})


module.exports = router