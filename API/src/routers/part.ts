import { Router } from "express"
import PartService from '../services/PartService'
import Part from '../models/PartModel'
import PartVehicle from '../models/PartVehicleModel'
import Vehicle from '../models/VehicleModel'
import PartController from '../controllers/PartController'
import { connAutomec } from '../database/index'
const router = Router()

const partService = new PartService(connAutomec.getSequelize() , Part, Vehicle, PartVehicle)
const partController = new PartController(partService)

router.get("/", partController.index.bind(partController))
router.post("/", partController.store.bind(partController))
router.put("/:id", partController.update.bind(partController))
router.delete("/:id", partController.delete.bind(partController))

export default router