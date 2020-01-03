<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ProficiencyDots extends Vue {
    @Prop(String) readonly proficiency!: string
  }
</script>

<template lang="pug">
  div.d-flex
    v-icon(v-if="proficiency==='proficient'", size="8").py-1.pr-1 fa-circle
    v-icon(v-else-if="proficiency==='expertise'", size="8").py-1.pr-1 fa-star
    v-icon(v-else, size="8").py-1.pr-1 far fa-circle
    slot
</template>
