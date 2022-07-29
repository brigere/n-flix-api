import express, { Express, NextFunction } from 'express';
import { RouteDefinition } from './shared/util.types';

export class ExpressApp {
  private app: Express
  private PORT = process.env.PORT || 5000

  constructor() {
    this.app = express()
    this.initDefaultMiddlewares()
  }

  initDefaultMiddlewares() {
    this.app.use('/', (req, res, next: NextFunction) => {
      console.log('new request!')
      next()
    })
  }

  setRoutes(routes: RouteDefinition[]) {
    routes.forEach(route => {
      this.app.use(route.path, route.router)
    })

    this.app.get('/api', (req, res) => res.json({ message: "API" }))
    this.app.get('/', (req, res) => res.json({ message: "Home" }))
    this.app.use((req, res, next) => res.status(404).json({message: "Resource does not exist"}))
  }

  run() {
    this.app.listen(
      this.PORT,
      () => console.log(`Server running ar port: ${this.PORT}`))
  }
}
