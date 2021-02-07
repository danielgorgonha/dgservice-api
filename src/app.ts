import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import nocache from 'nocache'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares() {
    this.express.use(express.json())
    if (process.env.NODE_ENV === 'production') {
      this.express.use(cors({ origin: `https://${process.env.pipedrive_company}.pipedrive.com` }))
    } else {
      this.express.use(cors())
    }
    this.express.use(morgan('dev'))
    this.express.use(nocache())
    this.express.use((req, res, next) => {
      if (req.query.apikey === process.env.apikey) {
        return next()
      } else {
        return res.status(401).json({ status: 401, message: 'Invalid Access!' })
      }
    })
  }

  private database(): void {
    mongoose.connect(`mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_pass}@cluster0.cvvay.mongodb.net/${process.env.mongodb_dbname}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new App().express
