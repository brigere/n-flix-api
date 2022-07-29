import { Router } from "express";
import { autoInjectable } from "tsyringe";
import { MovieController } from "./movie.controller";

@autoInjectable()
export class MovieRouter {
  public routes: Router = Router()

  constructor(
    private movieController: MovieController
  ) {
    this.setRoutes()
  }

  setRoutes() {
    this.routes.get('/:id/description', (req, res) => res.json({ data: req.params.id, description: "Description" }))
    this.routes.get('/:id', this.movieController.getMovieById)
    this.routes.get('/', this.movieController.getMovies)
  }
}