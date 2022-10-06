const { Model, DataTypes } = require('sequelize')
const { DATABASE_URL } = require('../util/config')

const { sequelize } = require('../util/db')

class Weather extends Model {}

Weather.init({
  db_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  max: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  min: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  humidity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'weather'
})

module.exports = Weather
