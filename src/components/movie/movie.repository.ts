import { injectable } from "tsyringe";
import * as mongo from 'mongodb'
import { Database } from "../../shared/database";
import { IMovieRepository, Movie, MoviePaginateOptoins, SearchOptionsDTO } from "./movie.types";

@injectable()
export class MovieRespository implements IMovieRepository {
  private movies?: mongo.Collection

  constructor(private db: Database) {
    this.movies = db.getConnection()?.collection('movies')
  }

  async getMovies(paginateOptions?: MoviePaginateOptoins): Promise<Movie[] | null> {
    if (!paginateOptions) paginateOptions = defaultPaginateOptions

    let movieresult = this.movies?.aggregate<Movie>([
      { $match: { "imdb.rating": { $gte: 0 } } },
      { $sort: { "imdb.rating": -1, "imdb.votes": -1 } },
      { $skip: paginateOptions.limit * paginateOptions.page },
      { $limit: paginateOptions.limit }
    ]).toArray()

    return movieresult || null
  }

  async getMovieById(id: string): Promise<Movie | null> {
    try {
      let isValidId = mongo.ObjectId.isValid(id)
      if (isValidId) {
        let movie = await this.movies?.findOne<Movie>(
          { _id: new mongo.ObjectId(id) }
        )
        return movie || null

      } else {
        return null
      }
    } catch (e) {
      throw e
    }
  }

  async getAllMovies(): Promise<Movie[] | null> {
    let movieResult = await this.movies?.find<Movie>({}).limit(10).toArray()
    return movieResult || null
  }

  async searchMovies(searchOptions: SearchOptionsDTO): Promise<Movie[] | null> {
    let key = new RegExp(searchOptions.keyword, 'i')

    let result = await this.movies?.aggregate<Movie>([
      { $match: { [searchOptions.searchField]: { $regex: key } } }
    ]).toArray()

    return result || null
  }
}

const defaultPaginateOptions: MoviePaginateOptoins = {
  sort: "rate",
  page: 0,
  limit: 20
}