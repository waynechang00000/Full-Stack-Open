const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('weather', "humidity", {
      allowNull: true
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("weather", "humidity", {
      allowNull: false
    })
  }
}
