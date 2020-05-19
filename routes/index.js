const express = require('express');
const router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./users');


router.use('/wiki', wikiRouter);
router.use('/users', userRouter);


module.exports = router;