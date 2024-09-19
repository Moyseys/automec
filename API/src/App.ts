import express, { Express } from 'express'

//Routers
import vehicle from './routers/vehicle'
import part from './routers/part'

export default class App {
  private app = express()

  constructor() {
    this.middleware()
    this.router()
  }
  
  private router() {
    this.app.use("/vehicle", vehicle)
    this.app.use("/part", part)
  }

  private middleware() {
    this.app.use(express.json())
  }

  public getApp(): Express {
    return this.app
  }
}