import App from "./App"
import { connAutomec } from "./database/index"

// import Vehicle from './models/VehicleModel'
// import Part from './models/PartModel'
// import PartVehicle from './models/PartVehicleModel'


const app = new App().getApp()
const port = process.env.PORT || "3000"

connAutomec.connect()
//connAutomec.getSequelize().sync()

app.listen(port, () => {
  console.log("Server is running...")
  console.log(`http://localhost:${port}`)
})
