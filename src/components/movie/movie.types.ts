class Movie {
  constructor(
    title: string,
    plot: string
  ){}
}

interface IMovieRepository {
  getMovieById(id: string): Promise<Movie | null>,
  getAllMovies(): Promise<Movie[] | null>
}