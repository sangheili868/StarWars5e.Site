<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Loading extends Vue { }
</script>

<template lang="pug">
  v-progress-circular(indeterminate, color="primary", size="100").ma-5
</template>
