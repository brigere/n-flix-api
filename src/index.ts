import 'reflect-metadata'
import { config } from 'dotenv'
import { ExpressApp } from './server'
import { container } from 'tsyringe'
import { Database } from './shared/database'
import { MovieRouter } from './components/movie/movie.router'
import { RouteDefinition } from './shared/util.types'
config()

async function Main() {
  const database = container.resolve(Database)
  

  
  try {
    await database.connect()
  } catch (e) {
    process.exit(1)
  }

  const movieRouter = container.resolve(MovieRouter)

  const server = new ExpressApp()

  let routes: RouteDefinition[] = [
    { path: "/api/movies", router: movieRouter.routes }
  ]

  server.setRoutes(routes)
  server.run()
}

Main()

