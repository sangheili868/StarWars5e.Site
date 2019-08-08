<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class PageNester extends Vue {
    @Prop(String) readonly name!: string
  }
</script>

<template lang="pug">
  router-view(exact, :name="name || 'default'")
</template>
