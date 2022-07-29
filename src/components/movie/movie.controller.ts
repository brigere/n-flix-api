import { Request, Response } from "express";
import { autoInjectable, injectable } from "tsyringe";
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

  public getMovieById() {
    
  }
}