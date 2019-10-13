<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { HitPointsType } from '@/types/completeCharacterTypes'
  import CheckList from '@/components/CheckList.vue'
  import MyDialog from '@/components/MyDialog.vue'

  @Component({
    components: {
      CheckList,
      MyDialog
    }
  })
  export default class CharacterSheetRest extends Vue {
    @Prop(Object) readonly hitPoints!: HitPointsType

    diceCounts: { [ key: string ]: number} = {}
    isRestOpen = false

    setCount (size: string, numSelected: number) {
      Vue.set(this.diceCounts, size, numSelected)
    }

    get totalCount () {
      return Object.values(this.diceCounts).reduce((sum, count) => sum + count, 0)
    }
  }
</script>

<template lang="pug">
div
  MyDialog(v-model="isRestOpen")
    template(v-slot:activator="{ on }")
      v-btn(small, v-on="on", color="secondary").ma-2 Rest
    template(#title) Rest
    template(#text)
      CheckList(
        v-for="{ size, current, maximum} in hitPoints.hitDice",
        :key="size",
        v-bind="{ current, maximum }"
        :title="size + 's'"
        @changeSelected="numSelected => setCount(size, numSelected)"
      ).ma-2
    template(#actions)
      v-btn(color="primary", @click="$emit('triggerShortRest', diceCounts)") Short Rest
        template(v-if="totalCount > 0")  (Use {{ totalCount }} hit {{ totalCount > 1 ? 'dice' : 'die' }})
      v-btn(color="primary", @click="$emit('triggerLongRest')") Long Rest
      v-spacer
      v-btn(color="primary", text, @click="isRestOpen=false") Close
</template>
