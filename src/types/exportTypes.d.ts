export interface Roll20CharacterAttribs {
  name: string,
  current: string | number,
  max: string | number
  id: string
}

export interface Roll20CharacterType {
  // eslint-disable-next-line camelcase
  schema_version: number,
  name: string,
  avatar: string,
  bio: string,
  exportedBy: 'www.sw5e.com',
  gmnotes: '',
  defaulttoken: '',
  tags: '[]',
  controlledby: '',
  inplayerjournals: '',
  attribs: Roll20CharacterAttribs[],
  abilities: []
}
