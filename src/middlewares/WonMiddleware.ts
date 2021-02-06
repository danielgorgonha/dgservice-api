import { Request, Response, NextFunction } from 'express'

const WonMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { current: { status } } = req.body

  if (status !== 'won') {
    return res.status(401).json({
      status: 401,
      message: 'Exclusive webhook for earned status offers'
    })
  }

  return next()
}

export default WonMiddleware
