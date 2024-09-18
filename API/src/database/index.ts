import { Sequelize } from "sequelize"

class DatabaseConnection {
  private sequelize: Sequelize

  constructor(database: string, username: string, password: string, host: string = 'localhost') {
    this.sequelize = new Sequelize(database, username, password, {
      host: host,
      dialect: 'mysql'
    })
  }

  public async connect() {
    try {
      await this.sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }

  public async close() {
    try {
      await this.sequelize.close()
      console.log('Connection closed successfully.')
    } catch (error) {
      console.error('Error closing the connection:', error)
    }
  }
}

export default DatabaseConnection
