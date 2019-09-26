<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { isEmpty } from 'lodash'

  @Component
  export default class LevelTable extends Vue {
    @Prop(String) readonly title!: string
    @Prop(Object) readonly levels!: { [level: string]: { [key: string]: string } }

    get headers () {
      const firstLevel = Math.min(...(Object.keys(this.levels).map((level: string) => parseInt(level))))
      return Object.keys(this.levels[firstLevel.toString()])
    }

    get hasLevels () {
      return !isEmpty(this.levels)
    }
  }
</script>

<template lang="pug">
  div(v-if="hasLevels").block.ma-0
    h2 The {{ title }}
    table(:class="$style.levelTable").table.text-center
      thead
        tr
          th(v-for="header in headers", :key="header", :class="{ 'text-left': header === 'Features' }").px-2 {{ header }}
      tbody
        tr(v-for="levelChanges, level in levels", :key="level").rows
          td(v-for="header in headers", :key="header", :class="{ 'text-left': header === 'Features' }").px-2
            | {{ levelChanges[header].replace(/\ufffd/g, '-') }}
</template>

<style module lang="scss">
  .levelTable {
    width: 100%;
  }
</style>
