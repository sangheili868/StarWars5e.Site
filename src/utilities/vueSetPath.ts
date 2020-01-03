import Vue from 'vue'
import { toPath } from 'lodash'

export default function (object: any, path: string, value: any) {
  let iterator = object
  const splitPath = toPath(path)
  splitPath.forEach((property, index) => {
    const isLast = index === splitPath.length - 1
    Vue.set(iterator, property, isLast ? value : (iterator[property] || {}))
    iterator = iterator[property]
  })
}
