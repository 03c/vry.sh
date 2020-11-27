const express = require('express');
const yup = require('yup');
const { Sequelize, Model, DataTypes } = require('sequelize');
const Hashids = require('hashids');
require('dotenv').config();

const router = express.Router();

const db = new Sequelize(process.env.DATABASE_URL);

class URL extends Model {}
URL.init(
  {
    url: DataTypes.string,
  },
  { db, modelName: 'url' },
);

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

    const hashids = new Hashids(process.env.HASH_SALT);

    const created = URL.create({
      url,
    });

    // eslint-disable-next-line no-underscore-dangle
    created.slug = `https://vry.sh/${hashids.encode(created.id)}`;

    res.json(created);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
