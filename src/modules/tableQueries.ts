import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { tableQueryType } from '@/types/utilityTypes'

function stateOf (context: any) {
  // Vuex-module-decorator changes 'this' when it converts into a module.
  return (context as { state: TableQueries }).state
}

@Module({ namespaced: true, name: 'tableQueries' })
export default class TableQueries extends VuexModule {
  tableQueries: tableQueryType[] = []

  @MutationAction({ mutate: ['tableQueries'] })
  async initQuery (tableName: string) {
    const newTableQueries = [...stateOf(this).tableQueries] || []
    const index = newTableQueries.findIndex(({ tableName: myTableName }) => tableName === myTableName)
    if (index < 0) newTableQueries.push({ tableName: tableName })
    return {
      tableQueries: newTableQueries
    }
  }

  @MutationAction({ mutate: ['tableQueries'] })
  async updateQuery ({ tableName, field, input }: { tableName: string, field: string, input: string | string[] }) {
    const newTableQueries = [...stateOf(this).tableQueries]
    const index = newTableQueries.findIndex(({ tableName: myTableName }) => tableName === myTableName)
    if (index < 0) {
      console.error(`TableQuery for table ${tableName} not found when settings ${field}:${input}`)
    } else {
      newTableQueries[index][field] = input
    }
    return {
      tableQueries: newTableQueries
    }
  }
}
