import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export const validateMongoId = (req: Request, res: Response, next: NextFunction) => {
  let id: string | undefined = req.params.id

  const isValid = (id: string) => ObjectId.isValid(id)

  if (id && isValid(id)) {
    next()
  } 
  else if (!id) {
    next()
  }
  else {
    res.status(400).json({
      status:"Bad request",
      message: "id provided is not valid"
    })
  }


}

export const validateSearchDTO = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.searchField && req.body.keyword) {
    next()
  } else {
    res.status(400).json({status: "failed", message: 'Provide valid body'})
  }
}