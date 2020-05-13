<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const dataVersionsModule = namespace('dataVersions')
  @Component
  export default class Loading extends Vue {
    @dataVersionsModule.State hasInternet!: boolean
  }
</script>

<template lang="pug">
  v-progress-circular(v-if="hasInternet", indeterminate, color="primary", size="100").ma-5
</template>
