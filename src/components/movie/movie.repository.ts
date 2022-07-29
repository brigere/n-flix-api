import { autoInjectable, injectable } from "tsyringe";
import * as mongo from 'mongodb'
import { Database } from "../../shared/database";

@injectable()
export class MovieRespository implements IMovieRepository {
  private movies?: mongo.Collection

  constructor(private db: Database) {
    this.movies = db.getConnection()?.collection('movies')
  }

  async getMovieById(id: string): Promise<Movie | null> {
    let movie = await this.movies?.findOne()
    return movie || null
  }

  async getAllMovies(): Promise<Movie[] | null> {
    let movieResult = await this.movies?.find({}).limit(10).toArray()
    return movieResult || null
  }
}