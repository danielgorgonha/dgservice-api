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
    await insertBling(createXML(getDetails, listAllProducts))

    //console.log(data)

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

    const productArray: Array<IProductArray> = []

    for (const key in data) {
      const { data: {
        data: {
          name: productName, code, unit, tax, prices }
        } }: IProduct = await ApiPipeDrive.get(`/products/${data[key].product_id}`, {
        params: {
          api_token: process.env.pipedrive_token
        }
      })
      productArray.push({
        productName,
        code,
        unit,
        quantify: data[key].quantify,
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

interface ICompany {
  company: string
  address: string
  person: string
  phone: string
  email: string
}

interface IProductArray {
  productName: string
  code: string
  unit: string
  quantify: number
  tax: number
  price: number
  cost: number
  overhead_cost: number
}

const createXML = (company: ICompany, listProduct: Array<IProductArray>) => {

  let items = []
  for (const key in listProduct) {
    items.push(`
      <item>
        <codigo>${listProduct[key].code}</codigo>
        <descricao>${listProduct[key].productName}</descricao>
        <un>${listProduct[key].unit}</un>
        <qtde>${listProduct[key].quantify}</qtde>
        <vlr_unit>${listProduct[key].price}</vlr_unit>
      </item>
    `)
  }

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <pedido>
      <cliente>
        <nome>${company.company}</nome>
        <endereco>${company.address}</endereco>
        <fone>${company.phone}</fone>
        <email>${company.email}</email>
      </cliente>
      <itens>
        ${JSON.stringify(items).replace(/(\[")|(\"])/g, "").replace(/\s/g, "")}
      </itens>
    </pedido>
  `
}

const insertBling = async (xml: string) => {
  try {
    return await ApiBling.post('/pedido/', null, {
      params: {
        apikey: process.env.bling_apikey,
        xml
      }
    })
  } catch (err) {
    throw JSON.stringify(err.response)
  }
}
