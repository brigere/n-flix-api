import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { MovieRespository } from "./movie.repository";

@autoInjectable()
export class MovieController {

  constructor(
    private movieRepositoty: MovieRespository
  ){}

  public getMovies = async (req: Request , res: Response) => {
    try {
      let movies = await this.movieRepositoty.getAllMovies()
      res.json(
        {
          status: "success",
          data: movies
        }
      )
    }
    catch (e) {
      console.error(`An error ocurred: ${e}`)
      res.status(500).json({
        status: "Failed",
        error: "Ann error ocurred"
      })
    }
  }

  public getMovieById = async (req: Request, res: Response) => {
    let id = req.params.id
    
    let movie = await this.movieRepositoty.getMovieById(id)

    if (movie){
      res.json({stauts: "success", data: movie})
    } else {
      this.returnFiledOperation(res)
    }
  }

  private returnFiledOperation(res: Response) {
    res.json({
      status: "Failed",
      data: null
    })    
  }
}