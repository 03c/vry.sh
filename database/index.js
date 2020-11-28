const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

(async () => {
  await sequelize.sync({ alter: true });
})();

class URL extends Model {}
URL.init(
  {
    url: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'url',
  },
);

module.exports = { URL };
