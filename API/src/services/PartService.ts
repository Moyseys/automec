import { Includeable, Model, Sequelize, where } from 'sequelize'
import Part from '../models/PartModel'
import PartVehicle from '../models/PartVehicleModel'
import Vehicle from '../models/VehicleModel'

export default class PartService {
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
    const include: Includeable = {
      model: this.VehicleModel,
      through: {
        attributes: []
      }
    }

    if (brand && model) include.where = { brand, model }

    const { count, rows: parts } = await Part.findAndCountAll({
      limit: limit,
      offset: offset,
      include: include,
      distinct: true,
    });



    return { count, parts }
  }

  async verifyPartNumber(partNumber: String) {
    const exists = !! await this.PartModel.findOne({
      where: {
        partNumber: partNumber
      }
    })

    return exists
  }

  async verifyVehiclesIds(vehiclesIds: number[]) {
    try {
      const vehicles = await this.VehicleModel.findAll({
        where: {
          id: vehiclesIds
        }
      })

      if (!vehicles || vehicles.length < vehiclesIds.length) {
        return false
      }

      return true
    } catch (error) {
      return 'Erro ao vereficar se veoculos existe.';
    }

  }

  async create(vehiclesIds: number[], partNumber: String, brand: String, model: String) {
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

  async update(vehiclesIds: number[], partNumber: String, newPartNumber: String, brand: String, model: String) {
    const transaction = await this.sequelize.transaction()

    try {
      const part = await this.PartModel.findOne({
        where: {
          partNumber,
        },
        transaction
      })
      if (!part) {
        await transaction.rollback()
        return `Peça com o partNumber: ${partNumber} não existe!`
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
          partId: part.get("id")
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

      await this.partVehicleModel.bulkCreate(relations, { transaction })

      const partUpdated = await part.update({
        partNumber: newPartNumber,
        brand,
        model
      }, { transaction })

      await transaction.commit()
      return partUpdated

    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao atualizar a peça:', error);
      return 'Erro ao atualizar a peça. Tente novamente mais tarde.';
    }
  }

  async delete(ids: number[]) {
    const parts = await this.PartModel.findAll({
      where: {
        id: ids
      }
    });

    if (parts.length === 0) {
      return `Nenhuma peça com os IDs fornecidos foi encontrada!`;
    }

    await Promise.all(parts.map(part => part.destroy()));

    return `Peças com IDs: ${ids.join(', ')} deletadas com sucesso!`;
  }

}