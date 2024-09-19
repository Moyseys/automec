import { Sequelize, DataTypes, ModelScopeOptions } from 'sequelize'
import { connAutomec } from "../database/index"
import Vehicle from './VehicleModel';
import PartVehicle from './PartVehicleModel';

const sequelize = connAutomec.getSequelize()

const Part = sequelize.define('part', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  partNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  brand: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(255),
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
  tableName: 'part',
  timestamps: true,
})

export default Part
