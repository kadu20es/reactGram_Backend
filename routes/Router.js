const express = require('express');
const router = express()

// rotas
router.use("/api/users", require("./UserRoutes"));
// test route
router.get("/", (req, res) => {
    res.send("API IS WORKING!")
})


module.exports = router