const express = require('express');
const fetch = require('node-fetch');

var router = express.Router();

router.post('/:guild-id/dashboard', function (req, res) {
    res.end(req.params.guild-id)
  })

module.exports = router;