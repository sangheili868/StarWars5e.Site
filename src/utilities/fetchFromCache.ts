import axios from 'axios'
/*
  1. On app load, fetch latest dataVersion and set data version timeout
  2. On page load, compare dataVersiontimeout to current date, and fetch if out of date.
  3. Next on page load, for each table needed by page, check version and fetch if cache is empty or out of date
*/
export default async function fetchFromCache (context: any, dataName: string, endpoint: string) {
  let data = context.state[dataName]
  let cachedVersion = context.state.cachedVersion
  const dataVersions = context.rootState.dataVersions
  if (!dataVersions || dataVersions.dataVersionTimeout <= (new Date())) {
    await context.dispatch('dataVersions/fetchDataVersions', null, { root: true })
  }
  try {
    const dataVersion = dataVersions.dataVersions.find(({ name }: { name: string }) => name === dataName)
    if (!data || !dataVersion || (context.state.cachedVersion < dataVersion.version)) {
      console.log(`Fetching ${dataName} from database`)
      data = (await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/${endpoint}`)).data
      cachedVersion = dataVersion
      await context.dispatch('dataVersions/setInternet', null, { root: true })
    }
  } catch (e) {
    console.error('Failed to fetch')
    await context.dispatch('dataVersions/setNoInternet', null, { root: true })
    throw e
  }
  return { data, cachedVersion }
}

export async function fetchBlobFromCache (context: any, bookName: string, chapterName: string, dataVersionName: string, endpoint: string) {
  let blobs = context.state[bookName]
  let cachedVersions = context.state.cachedVersions
  const dataVersions = context.rootState.dataVersions
  if (!dataVersions || dataVersions.dataVersionTimeout <= (new Date())) {
    await context.dispatch('dataVersions/fetchDataVersions', null, { root: true })
  }
  try {
    const dataVersion = dataVersions.dataVersions.find(({ name }: { name: string }) => name === dataVersionName)
    if (!blobs || !blobs[chapterName] || !dataVersion || !cachedVersions || (cachedVersions[bookName] < dataVersion.version)) {
      console.log(`Fetching ${chapterName} blob from database`)
      const chapter = (await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/${endpoint}/${chapterName}.json`)).data
      blobs = {
        ...blobs,
        [chapterName]: chapter.contentMarkdown
      }
      cachedVersions = {
        ...cachedVersions,
        [bookName]: dataVersion
      }
      await context.dispatch('dataVersions/setInternet', null, { root: true })
    }
  } catch (e) {
    console.error('Failed to fetch')
    await context.dispatch('dataVersions/setNoInternet', null, { root: true })
    throw e
  }
  return { blobs, cachedVersions }
}

export async function fetchBlobsFromCache (context: any, dataName: string, dataVersionName: string, endpoint: string) {
  let data = context.state[dataName]
  let cachedVersions = context.state.cachedVersions
  const dataVersions = context.rootState.dataVersions
  if (!dataVersions || dataVersions.dataVersionTimeout <= (new Date())) {
    await context.dispatch('dataVersions/fetchDataVersions', null, { root: true })
  }
  try {
    const dataVersion = dataVersions.dataVersions.find(({ name }: { name: string }) => name === dataVersionName)
    if (!data || !data.length || !dataVersion || !cachedVersions || (cachedVersions[dataName] < dataVersion.version)) {
      console.log(`Fetching ${dataName} blobs from database`)
      data = (await axios.get(`${process.env.VUE_APP_sw5eapiurl}/api/${endpoint}`)).data
      cachedVersions = {
        ...cachedVersions,
        [dataName]: dataVersion
      }
      await context.dispatch('dataVersions/setInternet', null, { root: true })
    }
  } catch (e) {
    console.error('Failed to fetch')
    await context.dispatch('dataVersions/setNoInternet', null, { root: true })
    throw e
  }
  return { data, cachedVersions }
}
