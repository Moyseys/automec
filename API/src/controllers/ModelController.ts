import { Request, Response } from 'express'
import brands from '../database/Brands'

export default class ModelController {
  public async index(req: Request, res: Response) {
    try {
      const brandName = String(req.query.brand) || ""

      if (!brandName) {
        return res.status(400).json({ error: "Brand inválidos" })
      }
      const models = brands.find(brand => brand.name == brandName)?.models
      return res.status(200).json(models)
    } catch (error: any) {
      console.log(error)
      return res.status(500).json({ error: error.message })
    }
  }
}