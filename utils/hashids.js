const Hashids = require('hashids');

require('dotenv').config();

const hashids = new Hashids(
  process.env.HASH_SALT,
  parseInt(process.env.HASH_LENGTH, 10),
);

module.exports = hashids;
