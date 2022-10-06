const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('weather', 'humidity', {
      type: DataTypes.INTEGER,
      allowNull: true,
    }),
    await queryInterface.removeColumn('weather', 'content')
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('humidity')
    await queryInterface.addColumn('content')
  }
}
