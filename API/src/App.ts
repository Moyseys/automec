import express, { Express } from 'express'
import cors from "cors"

//Routers
import vehicle from './routers/vehicle'
import part from './routers/part'

export default class App {
  private app = express()

  constructor() {
    const corsOptions = {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],      
      allowedHeaders: [], 
      optionsSuccessStatus: 200  
    };
    this.app.use(cors(corsOptions))
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