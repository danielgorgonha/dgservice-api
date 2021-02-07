import { Request, Response, NextFunction } from 'express'
import moment from 'moment'

moment.locale()

const FindWonMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { dateStart, dateEnd } = req.query

  //Fields required's
  if (!dateStart || !dateEnd) {
    return res.status(400).json({
      status: 400,
      message: !dateStart ? 'dateStart required' : 'dateEnd required'
    })
  }

  //Field validations
  if (dateValidate(dateStart.toString())) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid dateStart: ' + dateStart
    })
  }

  if (dateValidate(dateEnd.toString())) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid dateEnd: ' + dateEnd
    })
  }

  return new next()
}

export default FindWonMiddleware

//Functions for validations
//Date validate
const dateValidate = (query: string) => {
  return !moment(`${query}`, 'YYYY-MM-DD', true).isValid()
}
