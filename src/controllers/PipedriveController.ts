import { Request, Response } from 'express'

//Services
import { ApiBling, ApiPipeDrive } from '@services/Api'

//Models Schema
import Opportunities from '@models/Opportunities'

class PipedriveController {

  public async index(req: Request, res: Response): Promise<Response> {
    const { dateStart, dateEnd } = req.query
    const getData = await Opportunities.find({
      date: {
        $gte: dateStart,
        $lte: dateEnd
      }
    })
    let synthetic = {
      total_dealvalue: 0
    }
    let analytic: Array<any> = []
    let dtArray: Array<any> = []
    for (const key of getData) {
      dtArray.push(key.date)
      synthetic.total_dealvalue += key.dealValue
    }

    dtArray.filter((thisOne, i) => {
      if (dtArray.indexOf(thisOne) === i) {
        let sumValue = 0
        getData.filter((data) => {
          if (data.date === thisOne) {
            sumValue += data.dealValue
          }
        })

        analytic.push({
          date: thisOne,
          dealValue: Number(sumValue.toFixed(2))
        })
      }
    })

    return res.status(200).json({synthetic, analytic})
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { current: { org_id, value } }: IData = req.body

    try {
      //Insert database
      await Opportunities.create({ dealValue: value })

      //Get details of a deal
      const getDetails = await getDeals(org_id)

      //List products attached to a deal
      const listAllProducts = await getProducts(org_id)

      //Bling request post
      const order = await ApiBling.post('/pedido/', null, {
        params: {
          apikey: process.env.bling_apikey,
          xml: createXML(getDetails, listAllProducts)
        }
      })

      return res.status(200).json(order.data)
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 500,
        message: 'Error - ' + err
      })
    }
  }

}

export default new PipedriveController()

interface IData {
  current: {
    org_id: number
    value: number
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
  quantity: number
  tax: number
  price: number
  cost: number
  overhead_cost: number
}

const getDeals = async (id: number) => {
  try {
    const { data: { data } }: IPersons = await ApiPipeDrive.get(`/deals/${id}`)
    return {
      company: data.org_id.name,
      address: data.org_id.address,
      person: data.person_id.name,
      phone: data.person_id.phone.map((phone) => phone.primary ? phone.value : '').toString(),
      email: data.person_id.email.map((email) => email.primary ? email.value : '').toString()
    }
  } catch (err) {
    console.log('getDealsError - ' + err)
    throw err
  }
}

const getProducts = async (id: number) => {
  try {
    const { data: { data } }: IDealProduct = await ApiPipeDrive.get(`/deals/${id}/products`)

    const productArray: Array<IProductArray> = []

    for (const key in data) {
      const { data: { data: dataProduct } }: IProduct = await ApiPipeDrive.get(`/products/${data[key].product_id}`)

      productArray.push({
        productName: dataProduct.name,
        code: dataProduct.code,
        unit: dataProduct.unit,
        quantity: data[key].quantity,
        tax: dataProduct.tax,
        price: dataProduct.prices[0].price,
        cost: dataProduct.prices[0].cost,
        overhead_cost: dataProduct.prices[0].overhead_cost
      })

    }
    return productArray
  } catch (err) {
    console.log('getProductError - ' + err)
    throw err
  }
}

const createXML = (company: ICompany, listProduct: Array<IProductArray>) => {
  let items = []
  for (const key in listProduct) {
    items.push(`
      <item>
        <codigo>${listProduct[key].code}</codigo>
        <descricao>${listProduct[key].productName}</descricao>
        <un>${listProduct[key].unit}</un>
        <qtde>${listProduct[key].quantity}</qtde>
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
