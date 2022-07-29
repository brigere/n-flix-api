import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { MovieRespository } from "./movie.repository";

@autoInjectable()
export class MovieController {

  constructor(
    private movieRepositoty: MovieRespository
  ){}

  public getMovies = async (req: Request , res: Response) => {
    let movies: Movie[]

    this.movieRepositoty.getAllMovies()
      .then(result => {
        res.json({status: "Success", data: result})
      })
      .catch(e => {
        console.error(`An error ocurred while fetching from database`)
        this.returnErrorMessage(res)
      })
  }

  public getMovieById = async (req: Request, res: Response) => {
    let id = req.params.id
    let movie: Movie | null

    this.movieRepositoty.getMovieById(id)
      .then(movie => {
        if (movie) res.json({status: "Success", data: movie})
        else this.returnFiledOperation(res)
      })
      .catch(e => this.returnErrorMessage(res))
  }

  returnFiledOperation(res: Response) {
    res.json({
      status: "Failed",
      data: null
    })    
  }

  returnErrorMessage(res: Response) {
    res.status(500).json({status: "Error", message: "An error ocurred in server"})
  }
}