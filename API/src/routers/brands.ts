import { Router } from "express"
import BrandController from '../controllers/BrandController'
const router = Router()

const brandController = new BrandController()

router.get("/", brandController.index.bind(brandController))

export default router