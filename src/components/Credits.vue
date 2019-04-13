<script>
import azure from 'azure-storage'

export default {
  name: 'Credits',
  data () {
    return {
      msg: 'Loading'
    }
  },

  created () {
    const sas = 'sv=2018-03-28&ss=bfqt&srt=sco&sp=rl&se=2019-12-31T05:44:10Z&st=2019-04-07T20:44:10Z&spr=https&sig=0dTdKw%2BfYmlFhbeUOhIZy%2FXMg22Bj2LIedcL803efbQ%3D'
    const uri = 'https://starwars5e.table.core.windows.net'
    const tableService = azure.createTableServiceWithSas(uri, sas)
    const tableQuery = new azure.TableQuery().top(200).where('PartitionKey eq ?', 'Credit' )
    tableService.queryEntities('credits', tableQuery, null, (error, results) => {
      if (!error) {
        this.msg = results.entries.map(({ RowKey }) => RowKey._).join(', ')
      }
    })
  }
}
</script>

<template>
  <div class="hello">
    <h1>Credits</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
