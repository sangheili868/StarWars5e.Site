<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { MonsterType } from '@/types.ts'
  import ReferenceMonsterDescription from './ReferenceMonsterDescription.vue'

  const monsterModule = namespace('monsters')

  @Component({
    components: {
      ReferenceMonsterDescription
    }
  })
  export default class ReferenceMonstersDetail extends Vue {
    @monsterModule.State monsters!: MonsterType[]
    @monsterModule.Action fetchMonsters!: () => void

    @Prop(String) readonly monsterName!: string

    created () {
      this.fetchMonsters()
    }

    get monster () {
      return this.monsters.find(({ name }: MonsterType) => name === this.monsterName)
    }
  }
</script>

<template lang="pug">
  ReferenceMonsterDescription(v-bind="{ monster }", isAtDetail)
</template>
