const Weather = require('./weather')

Weather.sync({ force: true })

module.exports = {
  Weather
}
