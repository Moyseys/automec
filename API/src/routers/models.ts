import { Router } from "express"
import ModelController from '../controllers/ModelController'
const router = Router()

const modelController = new ModelController()

router.get("/", modelController.index.bind(modelController))

export default router