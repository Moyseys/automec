import express, { Express } from 'express'
import cors from "cors"

//Routers
import vehicle from './routers/vehicle'
import part from './routers/part'
import brands from './routers/brands'
import models from './routers/models'

export default class App {
  private app = express()

  constructor() {
    const corsOptions = {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],      
      allowedHeaders: "*", 
      optionsSuccessStatus: 200  
    };
    this.app.use(cors(corsOptions))
    this.middleware()
    this.router()
  }
  
  private router() {
    this.app.use("/vehicle", vehicle)
    this.app.use("/part", part)
    this.app.use("/model", models)
    this.app.use("/brand", brands)
  }

  private middleware() {
    this.app.use(express.json())
  }

  public getApp(): Express {
    return this.app
  }

  
}