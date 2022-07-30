import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import CommentRepository from "./comment.repository";

@autoInjectable()
export class CommentController {

  constructor(
    private commentRepository: CommentRepository
  ) { }

  public getCommentsByMovie = async (req: Request, res: Response) => {
    let movieId = req.params.id

    this.commentRepository.getAllCommentsByMovie(req.params.id)
      .then(comments => res.json({ movieId, comments }))
      .catch(e => res.status(500).json({ status: "Error", message: "An error ocurred in the server" }))
  
  }

}