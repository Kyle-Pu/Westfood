const express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    console.log("pinged the / endpoint")
})


module.exports = router