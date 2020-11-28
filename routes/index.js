const express = require('express');
const { URL } = require('../database');
const hashids = require('../utils/hashids');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'vry.sh' });
});

/* GET Short URL / Redirect. */
router.get('/:hash', async (req, res, next) => {
  try {
    const { hash } = req.params;

    const id = parseInt(hashids.decode(hash), 10);
    const url = await URL.findByPk(id);

    res.redirect(301, url.url);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
