const express = require('express');
const yup = require('yup');
const hashids = require('../config/hashids');
const { URL } = require('../config/database');

const router = express.Router();

const createUrlSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

router.post('/url', async (req, res, next) => {
  const { url } = req.body;
  try {
    await createUrlSchema.validate({
      url,
    });
    if (url.includes('vry.sh')) {
      throw new Error('Stop multiple very short URLS. 🛑');
    }

    const created = await URL.create({
      url,
    });

    const responseBody = {
      url,
      slug: `https://vry.sh/${hashids.encode(created.id)}`,
    };

    res.json(responseBody);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
