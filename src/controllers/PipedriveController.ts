import { Request, Response } from 'express'

//Services
import { ApiBling, ApiPipeDrive } from '@services/Api'

//Models Schema
import Opportunities from '@models/Opportunities'

class PipedriveController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { current: { org_id, value } }: IData = req.body

    //Insert database
    await insertDB(value)

    //Get details of a deal
    const getDetails = await getDeals(org_id)

    //List products attached to a deal
    const listAllProducts = await getProducts(org_id)

    //Bling request post
    try {

    } catch (err) {
      throw JSON.stringify(err.response)
    }


    return res.status(200).json()
  }

}

export default new PipedriveController()

interface IData {
  current: {
    org_id: number
    value: number
  }
}
const insertDB = async (value: number) => {
  try {
    await Opportunities.create({
      valor_total: value
    })
  } catch (err) {
    throw err
  }
}

interface IPersons {
  data: {
    data: {
      org_id: {
        name: string
        address: string
      },
      person_id: {
        name: string
        phone: [
          {
            label: string
            value: string
            primary: boolean
          }
        ]
        email: [
          {
            label: string
            value: string
            primary: boolean
          }
        ]
      }
    }
  }
}

const getDeals = async (id: number) => {
  try {
    const { data: {
      data: {
        org_id: { name: company, address },
        person_id: { name: person, phone, email }
      } } }: IPersons = await ApiPipeDrive.get(`/deals/${id}`, {
      params: {
        api_token: process.env.pipedrive_token
      }
    })
    return {
      company,
      address,
      person,
      phone: phone.map((phone) => phone.primary ? phone.value : '').toString(),
      email: email.map((email) => email.primary ? email.value : '').toString()
    }
  } catch (err) {
    throw err
  }
}

interface IDealProduct {
  data: {
    data: {
      product_id: number
    }
  }
}

interface IProduct {
  data: {
    data: {
      name: string
      code: string
      unit: string
      tax: number
      prices: [
        {
          price: number
          cost: number
          overhead_cost: number
        }
      ]
    }
  }
}

const getProducts = async (id: number) => {
  try {
    const { data: { data } }: IDealProduct = await ApiPipeDrive.get(`/deals/${id}/products`, {
      params: {
        api_token: process.env.pipedrive_token
      }
    })

    const productArray: Array<any> = []

    for (const key in data) {
      const { data: { data: { name: productName, code, unit, tax, prices } } }: IProduct = await ApiPipeDrive.get(`/products/${data[key].product_id}`, {
        params: {
          api_token: process.env.pipedrive_token
        }
      })

      productArray.push({
        productName,
        code,
        unit,
        tax,
        price: prices[0].price,
        cost: prices[0].cost,
        overhead_cost: prices[0].overhead_cost
      })
    }
    return productArray
  } catch (err) {
    throw err
  }
}

const createXML = (data: any) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <pedido>
      <cliente>
        <nome>${data}</nome>
        <fone>${data}</fone>
        <email>${data}</email>
      </cliente>
      <itens>
        <item>
          <codigo>001</codigo>
          <descricao>Caneta 001</descricao>
          <un>Pç</un>
          <qtde>10</qtde>
          <vlr_unit>1.68</vlr_unit>
        </item>
      </itens>
      <parcelas>
        <parcela>
          <data>01/09/2009</data>
          <vlr>100</vlr>
          <obs>Teste obs 1</obs>
        </parcela>
        <parcela>
          <data>06/09/2009</data>
          <vlr>50</vlr>
          <obs></obs>
        </parcela>
        <parcela>
          <data>11/09/2009</data>
          <vlr>50</vlr>
          <obs>Teste obs 3</obs>
        </parcela>
      </parcelas>
    </pedido>
  `
}
