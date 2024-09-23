import { Request, Response } from 'express'
import brands from '../database/Brands'

export default class BrandController {
  public async index(req: Request, res: Response) {
    try {
      return res.status(200).json(brands)
    } catch (error: any) {
      console.log(error)
      return res.status(500).json({ error: error.message })
    }
  }
}