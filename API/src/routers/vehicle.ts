import { Router } from "express"

const router = Router()

router.get("/", (req, res) => res.send("Ola"))

export default router