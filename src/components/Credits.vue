<script>

  export default {
    name: 'Credits',
    data () {
      return {
        msg: 'Loading'
      }
    }

    // created () {
    //   const sas = process.env.tablestoragesas
    //   const uri = process.env.tablestorageurl
    //   const tableService = azure.createTableServiceWithSas(uri, sas)
    //   const tableQuery = new azure.TableQuery().top(200).where('PartitionKey eq ?', 'Credit')
    //   tableService.queryEntities('credits', tableQuery, null, (error, results) => {
    //     if (!error) {
    //       this.msg = results.entries.map(({ RowKey }) => RowKey._).sort((a, b) => {
    //         return a.toLowerCase().localeCompare(b.toLowerCase())
    //       }).join(', ')
    //     }
    //   })
    // }
  }
</script>

<template>
  <div class="credits">
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
