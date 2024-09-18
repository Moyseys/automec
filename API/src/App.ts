import express, { Express } from 'express'

export default class App {
  private app = express()

  constructor() {
    this.middleware()
    this.router()
  }
  
  private router() {
    
  }

  private middleware() {
    this.app.use(express.json())
  }

  public getApp(): Express {
    return this.app
  }
}