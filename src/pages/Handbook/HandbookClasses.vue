<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const classesModule = namespace('classes')

  @Component
  export default class HandbookClasses extends Vue {
    @classesModule.State classes!: string[]
    @classesModule.Action fetchClasses!: () => void

    created () {
      this.fetchClasses()
    }

    showSaves (saves: String[]) {
      return saves.join(' and ')
    }
  }
</script>

<template lang="pug">
  v-container(grid-list-lg, fluid)
    v-layout(row, wrap, justify-center)
      v-flex(v-for="charClass in this.classes", :key="charClass.name", d-flex).xs12.sm6.md4
        v-card(:to="`classes/${charClass.name}`", hover, exact).ma-2
          v-card-text(primary-title)
            h3 {{ charClass.name }}
            div.text-xs-left
              p {{ charClass.summary }}
              p.ma-0 #[strong Hit Die:] 1d{{ charClass.hitDiceDieType }}
              p.ma-0 #[strong Primary Ability:] {{ charClass.primaryAbility }}
              p.ma-0 #[strong Saves:] {{ showSaves(charClass.savingThrows) }}
</template>
