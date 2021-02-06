import axios from 'axios'

export const ApiBling = axios.create({
  baseURL: 'https://bling.com.br/Api/v2',
  params: {
    common: {
      apikey: process.env.bling_apikey
    }
  }
})

export const ApiPipeDrive = axios.create({
  baseURL: `https://${process.env.pipedrive_company}.pipedrive.com/api/v1`
})
