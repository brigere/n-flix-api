class Movie {
  constructor(
    public title: string,
    public plot: string
  ){}
}

interface IMovieRepository {
  getMovieById(id: string): Promise<Movie | null>,
  getAllMovies(): Promise<Movie[] | null>
}