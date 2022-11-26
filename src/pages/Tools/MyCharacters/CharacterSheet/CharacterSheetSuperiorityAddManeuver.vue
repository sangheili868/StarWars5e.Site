<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import MyDialog from '@/components/MyDialog.vue'
  import { ManeuverType } from '@/types/characterTypes'
  import { chain, range } from 'lodash'
  import CharacterSheetExpansionFeatures from './CharacterSheetExpansionFeatures.vue'
  import MySelect from '@/components/MySelect.vue'

  const maneuversModule = namespace('maneuvers')

  @Component({
    components: {
      CharacterSheetExpansionFeatures,
      MyDialog,
      MySelect
    }
  })
  export default class CharacterSheetCastingAddManeuver extends Vue {
    @Prop(Boolean) readonly icon!: boolean
    @Prop(Boolean) readonly disabled!: boolean
    @Prop(Array) readonly maneuversSelected!: string[]
    @Prop({ type: Array, default: () => [] }) readonly allManuevers!: string[]

    @maneuversModule.State maneuvers!: ManeuverType[]
    @maneuversModule.Action fetchManeuvers!: () => void

    isOpen = false
    typeFilter: string[] = []

    created () {
      this.fetchManeuvers()
    }

    get filteredManeuvers () {
      return chain(this.maneuvers)
        .filter(({ type }) => (!this.typeFilter.length || this.typeFilter.includes(type)))
        .sortBy(({ name }) => this.maneuversSelected.includes(name) ? -1 : 0)
        .value()
    }

    toggleManeuver (maneuverName: string) {
      const isSelected = this.maneuversSelected.includes(maneuverName)
      const maneuversWithoutNew = this.maneuversSelected.filter(maneuver => maneuver !== maneuverName)
      const maneuversWithNew = this.maneuversSelected.concat(maneuverName)
      this.$emit('updateManeuvers', isSelected ? maneuversWithoutNew : maneuversWithNew)
    }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      div.text-center.mt-2
        v-btn(v-on="on", :icon="icon", @click="levelFilter=0", color="primary")
          v-icon(v-if="icon") fa-plus
          template(v-else) Choose Maneuvers
    template(#title) Choose Maneuvers
    template(#text)
      MySelect(
        v-model="typeFilter",
        :items="['Physical', 'Mental', 'General']",
        multiple,
        clearable,
        label="Filter by Type"
      ).mt-3
      CharacterSheetExpansionFeatures(:features="filteredManeuvers", @saveFeatureConfig="(fc) => $emit('saveFeatureConfig', fc)").text-left
        template(v-slot="{ feature }")
          div.d-flex.align-center
            v-checkbox(
              :input-value="maneuversSelected.includes(feature.name)"
              color="primary",
              hide-details,
              :class="$style.checkbox",
              @click.stop="toggleManeuver(feature.name)"
            )
            div
              h4 {{ feature.name }}
              div(v-if="feature.prerequisite").text-caption #[strong Prerequisite:] {{ feature.prerequisite }}
    template(#actions)
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Done
</template>

<style lang="scss" module>
  .checkbox {
    flex: none !important;
    margin-top: 0 !important;
  }
</style>
