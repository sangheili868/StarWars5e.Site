import axios from 'axios'
import store from '@/store'

export default async function (route: string, params?: any): Promise<any> {
  try {
    ;(store as any)._actions['ui/setOffline'][0](false)
    return await axios.get(process.env.VUE_APP_sw5eapiurl + '/' + route, params)
  } catch (err) {
    console.error(err)
    console.warn('Entering Offline Mode')
    ;(store as any)._actions['ui/setOffline'][0](true)
    return {}
  }
}
