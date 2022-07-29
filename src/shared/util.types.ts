import { Router } from "express"

export interface RouteDefinition {
  path: string,
  router: Router
}