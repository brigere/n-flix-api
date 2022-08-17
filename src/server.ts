import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { RouteDefinition } from './shared/util.types';
import { validateMongoId } from './shared/validators';

export class ExpressApp {
  private app: Express
  private PORT = process.env.PORT || 5000

  constructor() {
    this.app = express()
    this.initDefaultMiddlewares()
  }

  initDefaultMiddlewares() {
    this.app.use(bodyParser.json())
    this.app.use('/api/movies/:movieid/comments/author/:id', validateMongoId)
    this.app.use('/api/movies/:movieid/comments/:id', validateMongoId)
    // this.app.use('/api/movies/:id', validateMongoId)
    
  }

  setRoutes(routes: RouteDefinition[]) {
    routes.forEach(route => {
      this.app.use(route.path, route.router)
    })

    // 404 Error messages
    this.app.use('/api/', (req, res, next) => res.status(404).json({status: "Error", message: "Resource does not exist, verify the URL"}))
    this.app.use('/', (req, res, next) => res.status(404).end())
  }

  run() {
    this.app.listen(
      this.PORT,
      () => console.log(`Server running ar port: ${this.PORT}`))
  }
}
