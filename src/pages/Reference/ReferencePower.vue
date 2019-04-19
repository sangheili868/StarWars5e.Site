<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { PowerType } from '@/types.ts'
  import VueMarkdown from 'vue-markdown'

  const powersModule = namespace('powers')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class ReferencePower extends Vue {
    @powersModule.State powers!: PowerType[]
    @powersModule.Action fetchPowers!: () => void

    @Prop(String) readonly powerName!: string

    created () {
      this.fetchPowers()
    }

    get powerData () {
      console.log(this.$route)
      return this.powers.find(({ name }: PowerType) => name === this.powerName)
    }
  }
</script>

<template lang="pug">
  div(v-if="powerData").text-xs-left
    h1 {{ powerData.name }}

    div(v-if="powerData.prerequisite") #[strong Prerequisite:] {{ powerData.prerequisite }}
    div(v-if="powerData.castingPeriodText") #[strong Casting Period:] {{ powerData.castingPeriodText }}
    div(v-if="powerData.range") #[strong Range:] {{ powerData.range }}
    div(v-if="powerData.duration") #[strong Duration:] {{ powerData.duration }}
    div(v-if="powerData.concentration") #[strong Requires concentration]
    div(v-if="powerData.forceAlignment") #[strong Force Alignment:] {{ powerData.forceAlignment }}
    br
    VueMarkdown {{ powerData.description }}
    VueMarkdown {{ powerData.higherLevelDescription }}
</template>
