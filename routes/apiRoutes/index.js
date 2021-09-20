const express = require('express');
const router = express.router()

router.use(require('./candidateRoutes'));

module.exports = router;