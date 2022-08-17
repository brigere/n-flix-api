export class Movie {
  constructor(
    public title: string,
    public plot: string
  ){}
}

export interface IMovieRepository {
  getMovieById(id: string): Promise<Movie | null>,
  getAllMovies(): Promise<Movie[] | null>
  getMovies(paginateOptions?: MoviePaginateOptoins): Promise<Movie[] | null>
  searchMovies(title: string): Promise<Movie[] | null>
}

export interface SearchOptions {
  paginateOptions: MoviePaginateOptoins,
  queryOptions: MovieQueryOptions
} 

export interface MoviePaginateOptoins {
  sort: 'year' | 'title' | 'rate',
  page: number,
  limit: number
}

export interface MovieQueryOptions {
  searchBy: 'title' | 'cast' | 'director',
  kewords: string[]
}