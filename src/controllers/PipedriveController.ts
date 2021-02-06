import { Request, Response } from 'express'

//Services
import { ApiBling, ApiPipeDrive } from '@services/Api'

//Models Schema
import Opportunities from '@models/Opportunities'

class PipedriveController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { current: { person_name, org_name, status, value } }: IData = req.body

    //Insert database
    try {
      await Opportunities.create({
        valor_total: value
      })
    } catch (err) {
      throw err
    }

    //Capture contact data
    let personName = ''
    let personPhone = ''
    let personEmail = ''

    try {
      const { data: { data: { items } } } = await ApiPipeDrive.get('/persons/search', {
        params: {
          api_token: process.env.pipedrive_token,
          term: person_name
        }
      })

      personName = items[0].item.name
      personPhone = items[0].item.phones[0]
      personEmail = items[0].item.emails[0]

    } catch (err) {
      throw err.response.data
    }




    return res.status(200).json([personName, personPhone, personEmail])
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
