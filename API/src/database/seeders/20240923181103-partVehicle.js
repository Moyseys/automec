'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('partVehicle', [
      {
        partId: 1,
        vehicleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 2,
        vehicleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 3,
        vehicleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 4,
        vehicleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 5,
        vehicleId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 6,
        vehicleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 7,
        vehicleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 8,
        vehicleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 9,
        vehicleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partId: 10,
        vehicleId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('partVehicle', null, {});
  }
};
