import { Router } from "express"
import VehicleService from '../services/VehicleService'
import Vehicle from '../models/VehicleModel'
import VehicleController from '../controllers/VehicleController'

const router = Router()

const vehicleService = new VehicleService(Vehicle)
const vehicleController = new VehicleController(vehicleService)

router.get("/", vehicleController.index.bind(vehicleController))
router.post("/", vehicleController.store.bind(vehicleController))
router.put("/:id", vehicleController.update.bind(vehicleController))
router.delete("/:id", vehicleController.delete.bind(vehicleController))

export default router