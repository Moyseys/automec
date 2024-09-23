import App from "./App"
import { connAutomec } from "./database/index"
import dotenv from 'dotenv'

dotenv.config()

const app = new App().getApp()
const port = process.env.PORT || "3000"

connAutomec.connect()
app.listen(port, () => {
  console.log("Server is running...")
  console.log(`http://localhost:${port}`)
})
