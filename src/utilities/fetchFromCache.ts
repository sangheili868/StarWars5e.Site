import axios from 'axios'
export default async function (cache: any[], endpoint: string) {
  const results = cache.length ? { data: cache } : await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/${endpoint}`)
  console.log('Fetching ' + endpoint + (cache.length ? ' from cache' : ' from database'))
  return results.data
}
