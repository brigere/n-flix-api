import { singleton } from "tsyringe"
import * as mongo from 'mongodb'

@singleton()
export class Database {
  private uri: string
  private connection?: mongo.Db

  constructor() {
    this.uri = String(process.env.DB_URI)
  }

  public async connect() {
    try {
      let client = new mongo.MongoClient(
        this.uri,
        { connectTimeoutMS: 5000 }
      )

      await client.connect()
      this.connection = await client.db("sample_mflix")
      console.log("Database connected")
    } catch (e) {
      console.error('An error ocurred while connecting to database')
      throw e
    }

  }

  getConnection() {
    if (this.connection) {
      return this.connection
    }
  }

}