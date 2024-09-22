import { Model, Sequelize, where } from 'sequelize'
import Part from '../models/PartModel'
import PartVehicle from '../models/PartVehicleModel'
import Vehicle from '../models/VehicleModel'

export default class PartService{
  private PartModel: typeof Part
  private VehicleModel: typeof Vehicle
  private partVehicleModel: typeof PartVehicle

  private sequelize: Sequelize

  constructor(sequelize: Sequelize, partModel: typeof Part, vehicleModel: typeof Part, partVehicle: typeof PartVehicle) {
    this.PartModel = partModel
    this.VehicleModel = vehicleModel
    this.partVehicleModel = partVehicle
    this.sequelize = sequelize
  }

  async getParts(offset: number, limit: number, brand: string, model: string) {
    const { count, rows: parts } = await Part.findAndCountAll({
      limit: limit,
      offset: offset,
      include: {
        model: this.VehicleModel,
        where: {
          brand,
          model
        }
      },
    });

    return { count, parts }
  }

  async verifyPartNumber(partNumber: String) {
    return !!this.PartModel.findOne({
      where: {
        partNumber: partNumber
      }
    })
  }

  async create(vehiclesIds: number[], partNumber: String, brand: String, model: String) {
    const vehicles = await this.VehicleModel.findAll({
      where: {
        id: vehiclesIds
      }
    })

    if (!vehicles || vehicles.length < vehiclesIds.length) {
      return "vehiclesIds inválidos!"
    }

    const newPart = await this.PartModel.create({
      partNumber,
      brand, 
      model
    })

    const relations = vehiclesIds.map((id: number) => {
      const values = {
        vehicleId: id,
        partId: newPart.getDataValue("id")
      }

      return values
    })

    await this.partVehicleModel.bulkCreate(relations)

    return newPart
  }
  
  async update(id: String, vehiclesIds: number[], partNumber: String, brand: String, model: String) {
    const transaction = await this.sequelize.transaction()
    
    try {
      const part = await this.PartModel.findByPk(String(id), {transaction})
      if (!part) {
        await transaction.rollback()
        return `Peça com o id: ${id} não existe!`
      }
    
      const vehicles = await this.VehicleModel.findAll({
        where: {
          id: vehiclesIds
        }
      })
      if (!vehicles || vehicles.length < vehiclesIds.length) {
        return "vehiclesIds inválidos!"
      }

      this.partVehicleModel.destroy({
        where: {
          partId: id
        },
        transaction
      })

      const relations = vehiclesIds.map((id: number) => {
        const values = {
          vehicleId: id,
          partId: part.getDataValue("id")
        }

        return values
      })

      await this.partVehicleModel.bulkCreate(relations, {transaction})

      const partUpdated = await part.update({
        partNumber,
        brand,
        model
      }, {transaction})

      await transaction.commit()
      return partUpdated

    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao atualizar a peça:', error);
      return 'Erro ao atualizar a peça. Tente novamente mais tarde.';
    }
  }

  async delete(id: String) {
    const part = await this.PartModel.findByPk(String(id))
    if (!part) {
      return `Peça com o id: ${id} não existe!`
    }

    await part.destroy()

    return `Peça com Id: ${id} deletada com sucesso!`
  }
}