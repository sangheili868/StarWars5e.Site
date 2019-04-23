<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { MonsterType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'

  const monsterModule = namespace('monsters')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class ReferenceMonstersDetail extends Vue {
    @monsterModule.State monsters!: MonsterType[]
    @monsterModule.Action fetchMonsters!: () => void

    @Prop(String) readonly monsterName!: string

    created () {
      this.fetchMonsters()
    }

    get monsterData () {
      return this.monsters.find(({ name }: MonsterType) => name === this.monsterName)
    }
  }
</script>

<template lang="pug">
  div( v-if="monsterData" ).text-xs-left
    h1 {{ monsterData.name }}
    p {{ monsterData }}
</template>
