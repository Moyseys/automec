import Part from './PartModel';
import Vehicle from './VehicleModel';

import { Sequelize, DataTypes } from 'sequelize'
import { connAutomec } from "../database/index"

const sequelize = connAutomec.getSequelize()

const PartVehicle = sequelize.define('partVehicle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  partId: {
    type: DataTypes.INTEGER,
    references: {
      model: Part,
      key: "id"
    }
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Vehicle,
      key: "id"
    }
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
  tableName: 'partVehicle',
  timestamps: true,
});

Part.belongsToMany(Vehicle, {
  through: {
    model: PartVehicle,
  },
  foreignKey: "partId",
  constraints: true
})

Vehicle.belongsToMany(Part, {
  through: {
    model: PartVehicle,
  },
  foreignKey: "vehicleId",
  constraints: true
})


export default PartVehicle;
