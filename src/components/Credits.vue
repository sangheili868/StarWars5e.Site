<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'Credits',
  data () {
    return {
      msg: 'Loading'
    }
  },

  created () {
    axios
      .get('https://localhost:44341/api/Credit')
      .then(results => {
        this.msg = _(results.data)
          .filter(credit => credit.partitionKey === 'Credit')
          .flatMap(credit => credit.rowKey)
          .join(', ')
      })
  }
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
