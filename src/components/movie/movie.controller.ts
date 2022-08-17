import { Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import { MovieRespository } from "./movie.repository";
import { IMovieRepository, MoviePaginateOptoins } from "./movie.types";

@autoInjectable()
export class MovieController {

  constructor(
    @inject(MovieRespository) private movieRepositoty: IMovieRepository
  ){}

  public getMovies = async (req: Request , res: Response) => {
    const paginateOptions: MoviePaginateOptoins = {
      sort: "rate",
      page: req.query.page ? Number(req.query.page) : 0,
      limit: req.query.limit ? Number(req.query.limit) : 20
    }

    this.movieRepositoty.getMovies(paginateOptions)
      .then(result => {
        res.json({
          status: "Success", 
          page: paginateOptions.page, 
          nextPage: req.hostname + req.baseUrl + `?page=${paginateOptions.page + 1}&limit=${paginateOptions.limit}`,
          count: result?.length, 
          data: result
        })
      })
      .catch(e => {
        console.error(`An error ocurred while fetching from database`)
        this.returnErrorMessage(res)
      })
  }

  public getMovieById = async (req: Request, res: Response) => {
    let id = req.params.id

    this.movieRepositoty.getMovieById(id)
      .then(movie => {
        if (movie) res.json({status: "Success", data: movie})
        else this.returnFiledOperation(res)
      })
      .catch(e => this.returnErrorMessage(res))
  }
  // TODO: valiadate searchDTO
  public searchMovies = async (req: Request, res: Response) => {
    const searchDTO = req.body

    this.movieRepositoty.searchMovies(searchDTO.title)
      .then(result => {
        res.json({
          status: 'success',
          count: result? result.length : 0,
          data: result
        })
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