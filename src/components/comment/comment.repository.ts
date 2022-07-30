import * as mongo from "mongodb";
import { injectable } from "tsyringe";
import { Database } from "../../shared/database";
import { Comment, ICommentRepository } from "./coment.types";

@injectable()
export default class CommentRepository implements ICommentRepository {
  private comments?: mongo.Collection<Comment>

  constructor(private db: Database) {
    this.comments = db.getConnection()?.collection('comments')
  }

  async getAllCommentsByMovie(movieId: string): Promise<Comment[] | null> {
    try {
      let commentsResult = await this.comments?.aggregate<Comment>([
          { $match: { movie_id: new mongo.ObjectId(movieId) } }  
        ]).toArray()
      
      return commentsResult ? commentsResult : []
    }
    catch (e) {
      throw e
    }
  }
  
  getMostPopularCommentsByMovie(movieId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  getAllCommentsByAuthor(authorId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  getMostPropularCommentByAuthor(authorId: String): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }

}