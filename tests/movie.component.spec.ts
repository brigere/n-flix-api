import 'reflect-metadata'
import { container } from "tsyringe"
import { MovieRespository } from "../src/components/movie/movie.repository"
import { Database } from "../src/shared/database"
import { config } from 'dotenv'
import CommentRepository from '../src/components/comment/comment.repository'
config()

describe("Movie component test", () => {
  let movieRepository: MovieRespository
  let commentRepository: CommentRepository
  let db: Database

  beforeAll(async () => {
    db = container.resolve(Database)
    await db.connect()
    movieRepository = container.resolve(MovieRespository)
    commentRepository = container.resolve(CommentRepository)
  })

  it('Can get movie by id', async () => {

    let movieId = '573a1390f29313caabcd4323'
    let title = "The Land Beyond the Sunset"
    
    let movie: Movie | null = await movieRepository.getMovieById(movieId)

    expect(movie?.title).toEqual(title)

  })
  

  it('Can get all comments given a movieId', async() => {

    let movieId = '573a1391f29313caabcd8979'

    let movie = await commentRepository.getAllCommentsByMovie(movieId)

    expect(movie?.length).toEqual(3)
  })


  afterAll(async () => {
    await db.closeConnection()
  })




})
