<script>
import azure from 'azure-storage'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Loading'
    }
  },

  created () {
    const sas = process.env.TABLE_STORAGE_SAS
    const uri = process.env.TABLE_STORAGE_URL
    const tableService = azure.createTableServiceWithSas(uri, sas)
    const tableQuery = new azure.TableQuery().top(200)
    tableService.queryEntities('classes', tableQuery, null, (error, results) => {
      if (!error) {
        this.msg = 'Classes: ' + results.entries.map(({ Name }) => Name._).join(', ')
      }
    })
  }
}
</script>

<template>
  <div class="hello">
    <h1>Star Wars</h1>
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
