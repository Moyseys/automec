import VehicleAttributes from '../interface/IVehicle'
import Vehicle from '../models/VehicleModel'

export default class VehicleService{
  private VehicleModel: typeof Vehicle

  constructor(vehicleModel: typeof Vehicle) {
    this.VehicleModel = vehicleModel
  }

  async getAllVehicles(){
    return await this.VehicleModel.findAll()
  }

  async create(brand: String, model: String, dateOfManufacture: Date) {
    return await this.VehicleModel.create({
      brand,
      model, 
      dateOfManufacture
    })
  }
  
  async update(id: String, brand: String, model: String, dateOfManufacture: Date) {
    const vehicle = await this.VehicleModel.findByPk(String(id))
    if (!vehicle) {
      return `Veículo com o id: ${id} não existe!`
    }
    
    return await vehicle.update({
      brand,
      model, 
      dateOfManufacture
    })
  }

  async delete(id: String) {
    const vehicle = await this.VehicleModel.findByPk(String(id))
    if (!vehicle) {
      return `Veículo com o id: ${id} não existe!`
    }

    await vehicle.destroy()

    return `Veículo com Id: ${id} deletado com sucesso!`
  }
}