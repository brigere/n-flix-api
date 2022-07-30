import { ObjectId } from "mongodb";

export class Comment {
  constructor(
    public _id: ObjectId,
    public name: string,
    public movie_id: ObjectId,
    public text: string,
    public date: Date
  ){}
}

export interface ICommentRepository {
  getAllCommentsByMovie(movieId: string): Promise<Comment[] | null>,
  getMostPopularCommentsByMovie(movieId: string): Promise<Comment[]>,
  getAllCommentsByAuthor(authorId: string): Promise<Comment[]>,
  getMostPropularCommentByAuthor(authorId: String): Promise<Comment[]>
}