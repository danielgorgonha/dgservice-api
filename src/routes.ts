import { Router } from 'express'

//Controllers
import PipedriveController from '@controllers/PipedriveController'

//Middlewares
import WonMiddlewares from '@middlewares/WonMiddleware'

const routes = Router()

//Pipedrive endpoint webhook
routes.post('/pipedrive/won', WonMiddlewares, PipedriveController.create)

//Pipedrive endpoint find totalized earnings
routes.get('/pipedrive/findWon', PipedriveController.index)

export default routes
