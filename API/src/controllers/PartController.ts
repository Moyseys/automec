import PartService from '../services/PartService'
import { Request, Response } from 'express'

export default class PartController{
  private partService: PartService

  constructor(PartService: PartService) {
    this.partService = PartService
  }
  
  public async index(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit) || 10
      const page = Number(req.query.page) || 1
      const brand = String(req.query.brand) || ""
      const model = String(req.query.model) || ""

      console.log(brand, model);
      
      if (!limit || !page || !brand || !model) {
        return res.status(400).json({ error: "Limit, Page, Brand ou Model inválidos" })
      }

      const offset = (page - 1) * limit

      const { count, parts } = await this.partService.getParts(offset, limit, brand, model)

      return res.status(200).json({
        total: count,
        totalOfPages: Math.ceil(count / limit),
        currentPage: page,
        parts: parts,
      })
    } catch (error: any) {
      console.log(error)      
      return res.status(500).json({ error: error.message })
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const { vehiclesIds, partNumber, brand, model} = req.body
      if (!vehiclesIds || vehiclesIds.length <= 0 || !partNumber || !brand || !model) {
        return res.status(400).json({ error: "Os campos 'vehiclesIds', 'brand', 'model' e 'partNumber' são obrigatórios." })
      }

      const existPartNumver = await this.partService.verifyPartNumber(partNumber)
      if (!existPartNumver) {
        return res.status(400).json({ error: `O partNumber: ${partNumber}, já existe!` }) 
      }

      const newPart = await this.partService.create(vehiclesIds, partNumber, brand, model)

      return res.status(200).json(newPart)
    } catch (error: any) {
      console.log(error )      
      return res.status(500).json({ error: error.message })
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { vehiclesIds, partNumber, brand, model} = req.body
      if (!vehiclesIds || vehiclesIds.length <= 0 || !partNumber || !brand || !model) {
        return res.status(400).json({ error: "Os campos 'vehiclesIds', 'brand', 'model' e 'partNumber' são obrigatórios." })
      }

      const existPartNumver = await this.partService.verifyPartNumber(partNumber)
      if (!existPartNumver) {
        return res.status(400).json({ error: `O partNumber: ${partNumber}, já existe!` }) 
      }
      
      const newPart = await this.partService.update(id, vehiclesIds, partNumber, brand, model)

      return res.status(200).json(newPart)
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

      const deleted = await this.partService.delete(id)

      return res.status(200).json(deleted)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}