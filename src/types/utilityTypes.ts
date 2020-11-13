import * as msal from '@azure/msal-browser'

export interface ReferenceTableType {
  content: string,
  contentType: string,
  name: string
}

export interface SearchResultType {
  globalSearchTermType: string,
  path: string,
  fullName: string,
  searchText: string,
  rowKey: string
}

export interface DataVersionType {
  name: string,
  version: number
}

export interface CharacterValidationType {
  code: number,
  isValid: boolean,
  message: string
}

export interface printFieldType {
  top: Number,
  left: Number,
  width?: Number,
  height?: Number,
  fontSize?: Number,
  myClass?: String,
  text?: String | Number
}

export interface Msal extends msal.PublicClientApplication {
  signIn?: Function,
  signOut?: Function,
  accessToken?: string
}
