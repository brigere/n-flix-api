import { Router } from "express";
import { autoInjectable } from "tsyringe";
import { CommentController } from "../comment/comment.controller";
import { MovieController } from "./movie.controller";

@autoInjectable()
export class MovieRouter {
  public routes: Router = Router()

  constructor(
    private movieController: MovieController,
    private commentController: CommentController
  ) {
    this.setRoutes()
  }

  setRoutes() {
    // GET /movies/:id/comments
    this.routes.get('/:id/comments', this.commentController.getCommentsByMovie)

    // GET: movies/:id
    this.routes.get('/:id', this.movieController.getMovieById)

    // GET: /movies
    this.routes.get('/', this.movieController.getMovies)
  }
}