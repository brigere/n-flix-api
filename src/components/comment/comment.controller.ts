import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import CommentRepository from "./comment.repository";
import * as mongo from "mongodb"

@autoInjectable()
export class CommentController {

  constructor(
    private commentRepository: CommentRepository
  ) { }

  public getCommentsByMovie = async (req: Request, res: Response) => {

    if (req.query.poluar) {
      res.json({ movieId: req.params.id, popularComments: true })
    }
    else {
      res.json({ movieId: req.params.id, popularComments: false })
    }
  }

}