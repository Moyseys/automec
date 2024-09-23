'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('part', [
      {
        partNumber: 'PN001',
        brand: 'ACDelco',
        model: 'Oil Filter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN002',
        brand: 'Bosch',
        model: 'Air Filter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN003',
        brand: 'Denso',
        model: 'Spark Plug',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN004',
        brand: 'Raybestos',
        model: 'Brake Pad',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN005',
        brand: 'Wagner',
        model: 'Brake Rotor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN006',
        brand: 'Monroe',
        model: 'Shock Absorber',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN007',
        brand: 'Mopar',
        model: 'Timing Belt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN008',
        brand: 'Duralast',
        model: 'Battery',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN009',
        brand: 'Gates',
        model: 'Serpentine Belt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN010',
        brand: 'ACDelco',
        model: 'Fuel Filter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN011',
        brand: 'NGK',
        model: 'Ignition Coil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN012',
        brand: 'Hastings',
        model: 'Oil Filter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN013',
        brand: 'Beck/Arnley',
        model: 'Water Pump',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN014',
        brand: 'Aisin',
        model: 'Timing Chain',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN015',
        brand: 'KYB',
        model: 'Strut Assembly',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN016',
        brand: 'Edelbrock',
        model: 'Carburetor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN017',
        brand: 'Spectra Premium',
        model: 'Radiator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN018',
        brand: 'Moog',
        model: 'Ball Joint',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN019',
        brand: 'TRW',
        model: 'Steering Rack',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partNumber: 'PN020',
        brand: 'FAG',
        model: 'Wheel Bearing',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('part', null, {});
  }
};
