import DatabaseConnection from "./DatabaseConnection"
//import "../models/associations"

const connAutomec = new DatabaseConnection("automec", "root", "senhamysql", "localhost")

export { connAutomec }