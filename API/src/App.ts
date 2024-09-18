import express, { Express } from 'express'

//Routers
import vehicle from './routers/vehicle'

export default class App {
  private app = express()

  constructor() {
    this.middleware()
    this.router()
  }
  
  private router() {
    this.app.use("/vehicle", vehicle)
  }

  private middleware() {
    this.app.use(express.json())
  }

  public getApp(): Express {
    return this.app
  }
}