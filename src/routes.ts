import { Router } from 'express'

//Controllers
import PipedriveController from '@controllers/PipedriveController'

//Middlewares
import WonMiddlewares from '@middlewares/WonMiddleware'

const routes = Router()

routes.post('/pipedrive/won', WonMiddlewares, PipedriveController.create)

export default routes
