import { Sequelize, DataTypes } from 'sequelize'
import { connAutomec } from "../database/index"
import Part from './PartModel';

const sequelize = connAutomec.getSequelize()

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  brand: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dateOfManufacture: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'vehicle',
  timestamps: true,
})

export default Vehicle
