import { singleton } from "tsyringe"
import * as mongo from 'mongodb'

@singleton()
export class Database {
  private uri: string
  private client?: mongo.MongoClient
  private connection?: mongo.Db

  constructor() {
    this.uri = String(process.env.DB_URI)
  }

  public async connect() {
    try {
      this.client = new mongo.MongoClient(
        this.uri,
        { connectTimeoutMS: 5000 }
      )

      await this.client.connect()
      this.connection = await this.client.db("sample_mflix")
      console.log("Database connected")
    } catch (e) {
      console.error('An error ocurred while connecting to database')
      throw e
    }

  }

  public async closeConnection() {
    this.client?.close()
      .catch(e => { console.log('An error ocurred while cosing connection') })
  }

  getConnection() {
    if (this.connection) {
      return this.connection
    }
  }

}