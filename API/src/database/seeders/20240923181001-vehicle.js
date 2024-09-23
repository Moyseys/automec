'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vehicle', [
      {
        brand: 'Toyota',
        model: 'Corolla',
        dateOfManufacture: new Date('2020-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Honda',
        model: 'Civic',
        dateOfManufacture: new Date('2019-05-20'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Ford',
        model: 'Focus',
        dateOfManufacture: new Date('2021-03-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Chevrolet',
        model: 'Malibu',
        dateOfManufacture: new Date('2018-08-25'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Nissan',
        model: 'Altima',
        dateOfManufacture: new Date('2022-02-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Hyundai',
        model: 'Elantra',
        dateOfManufacture: new Date('2021-06-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Kia',
        model: 'Optima',
        dateOfManufacture: new Date('2017-11-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Volkswagen',
        model: 'Jetta',
        dateOfManufacture: new Date('2019-04-18'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Subaru',
        model: 'Impreza',
        dateOfManufacture: new Date('2020-09-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand: 'Mazda',
        model: '3',
        dateOfManufacture: new Date('2018-12-12'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehicle', null, {});
  }
};
