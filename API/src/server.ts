import App from "./App"

const app = new App().getApp()
const port = process.env.PORT || "3000"

app.listen(port, () => {
  console.log("Server is running...")
  console.log(`http://localhost:${port}`)
})
