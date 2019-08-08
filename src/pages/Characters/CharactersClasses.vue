<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import CardSet from '@/components/CardSet.vue'
  import Loading from '@/components/Loading.vue'
  import { ClassType } from '@/types'

  const classesModule = namespace('classes')

  @Component({
    components: {
      Loading,
      CardSet
    }
  })
  export default class HandbookClasses extends Vue {
    @classesModule.State classes!: ClassType[]
    @classesModule.Action fetchClasses!: () => void

    created () {
      this.fetchClasses()
    }

    get classesWithLinks () {
      return this.classes.map(charClass => ({
        ...charClass,
        to: `classes/${charClass.name}`
      }))
    }

    showSaves (saves: String[]) {
      return saves.join(' and ')
    }
  }
</script>

<template lang="pug">
  div
    h1 Classes
    CardSet(:cards="classesWithLinks")
      template(v-slot="{ card }")
        v-card-text(primary-title)
          h3 {{ card.name }}
          div.text-xs-left
            p {{ card.summary }}
            p.ma-0 #[strong Hit Die:] 1d{{ card.hitDiceDieType }}
            p.ma-0 #[strong Primary Ability:] {{ card.primaryAbility }}
            p.ma-0 #[strong Saves:] {{ showSaves(card.savingThrows) }}
    Loading(v-if="!classes.length")
</template>
