const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Weather extends Model {}

Weather.init({
  db_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  humidity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'weather'
})

module.exports = Weather
