import { Request, Response } from 'express'

class PipedriveController {

  public async create(req: Request, res: Response): Promise<Response> {

    const { current: { person_name, org_name, status, value } }: IData = req.body

    return res.status(200).json(value)
  }
}

export default new PipedriveController()

interface IData {
  current: {
    person_name: string
    org_name: string
    status: string
    value: number
  }
}
