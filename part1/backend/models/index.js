const Weather = require('./weather')

Weather.sync({ alter: true })

module.exports = {
  Weather
}
