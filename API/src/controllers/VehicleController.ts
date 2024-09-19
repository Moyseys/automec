import VehicleService from '../services/VehicleService'
import { Request, Response } from 'express'

export default class VehicleController{
  private vehicleService: VehicleService

  constructor(vehicleService: VehicleService) {
    this.vehicleService = vehicleService
  }
  
  public async index(req: Request, res: Response) {
    try {
      const vehicles = await this.vehicleService.getAllVehicles()

      return res.status(200).json(vehicles)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const { brand, model, dateOfManufacture } = req.body
      if (!brand || !model || !dateOfManufacture) {
        return res.status(400).json({ error: "Os campos 'brand', 'model' e 'dateOfManufacture' são obrigatórios." })
      }


      const newVehicle = await this.vehicleService.create(brand, model, dateOfManufacture)

      return res.status(200).json(newVehicle)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { brand, model, dateOfManufacture } = req.body
      if (!brand || !model || !dateOfManufacture || !id) {
        return res.status(400).json({ error: "Os campos 'id', 'brand', 'model' e 'dateOfManufacture' são obrigatórios." })
      }

      const newVehicle = await this.vehicleService.update(id, brand, model, dateOfManufacture)

      return res.status(200).json(newVehicle)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ error: "Os campos 'id' são obrigatórios." })
      }

      const deleted = await this.vehicleService.delete(id)

      return res.status(200).json(deleted)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}