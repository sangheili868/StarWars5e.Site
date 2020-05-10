import axios from 'axios'

export default async function (state: any, dataName: string, endpoint: string) {
  let data: any[] = state[dataName] as any[]
  let cachedVersion = state.cachedVersion as number
  try {
    const dataVersions = await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/DataVersion`)
    const myDataVersion = dataVersions.data.find(({ name }: { name: string }) => name === dataName)
    const isOutOfDate = !myDataVersion || cachedVersion < myDataVersion.version
    if (isOutOfDate || !data.length) {
      data = (await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/${endpoint}`)).data
      cachedVersion = myDataVersion.version
    }
    console.log(dataName, myDataVersion.version, state.cachedVersion, isOutOfDate, state[dataName].length, data.length, cachedVersion)
  } catch (e) {
    // If this function gets called multiple times on the same page, we don't want to spam the user with alerts
    const myWindow = window as any
    window.alert('Warning: Could not connect to database. Check your internet connection.')
    if (!myWindow.alertOverwritten) {
      myWindow.alertOverwritten = true
      myWindow.oldAlert = window.alert
      window.alert = function (text: string) { console.log('Tried to alert: ' + text) }
      setTimeout(() => {
        window.alert = myWindow.oldAlert
        myWindow.alertOverwritten = false
        delete myWindow.oldAlert
      }, 3000)
    }
    throw e
  }
  return { data, cachedVersion }
}
