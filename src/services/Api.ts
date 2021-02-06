import axios from 'axios'

export const ApiBling = axios.create({
  baseURL: 'https://bling.com.br/Api/v2',
  params: {
    commom: {
      apikey: process.env.bling_apikey
    }
  }
})
