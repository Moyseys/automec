import DatabaseConnection from "./DatabaseConnection"
import dotenv from 'dotenv'

dotenv.config()

const connAutomec = new DatabaseConnection(
  process.env.DATABASE || '',
  Number(process.env.DATABASE_PORT) || 0,
  process.env.DATABASE_USERNAME || '',
  process.env.DATABASE_PASSWORD || '',
  process.env.DATABASE_HOST || '',
)

export { connAutomec }