<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types'
  import CheckList from '@/components/CheckList.vue'

  @Component({
    components: {
      CheckList
    }
  })
  export default class CharacterSheetRest extends Vue {
    @Prop(Object) readonly hitPoints!: HitPointsType

    diceCounts: { [ key: string ]: number} = {}

    setCount (size: string, numSelected: number) {
      Vue.set(this.diceCounts, size, numSelected)
    }

    get totalCount () {
      return Object.values(this.diceCounts).reduce((sum, count) => sum + count, 0)
    }
  }
</script>

<template lang="pug">
  v-card(:class="$style.modal")
    v-card-title(primary-title).primary--text.headline.grey.lighten-2 Rest
    v-card-text
      v-layout(wrap)
        CheckList(
          v-for="{ size, current, maximum} in hitPoints.hitDice",
          :key="size",
          v-bind="{ current, maximum }"
          :title="size + 's'"
          @changeSelected="numSelected => setCount(size, numSelected)"
        ).ma-2
    v-card-actions
      v-btn(color="primary", @click="$emit('triggerShortRest', diceCounts)") Short Rest
        template(v-if="totalCount > 0")  (Use {{ totalCount }} hit {{ totalCount > 1 ? 'dice' : 'die' }})
      v-btn(color="primary", @click="$emit('triggerLongRest')") Long Rest
      v-spacer
      v-btn(color="primary", flat, @click="isRestOpen=false") Close
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .modal {
    background: $backgroundGradient;
  }
</style>
