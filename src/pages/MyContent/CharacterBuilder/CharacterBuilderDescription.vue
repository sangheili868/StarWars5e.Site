<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { BackgroundType } from '@/types/characterTypes'
  import { RawBackgroundType } from '@/types/rawCharacterTypes'
  import CharactersBackgroundDetail from '@/pages/Characters/CharactersBackgroundDetail.vue'
  import { chain } from 'lodash'

  @Component({
    components: {
      CharactersBackgroundDetail
    }
  })
  export default class CharacterBuilderDescription extends Vue {
    @Prop(Array) readonly backgrounds!: BackgroundType[]
    @Prop(Object) readonly currentBackground!: RawBackgroundType

    get backgroundChoices () {
      return chain(this.backgrounds)
        .sortBy('contentType')
        .map('name')
        .value()
    }

    get chosenBackground () {
      return this.backgrounds.find(({ name }) => name === this.currentBackground.name)
    }

    get featOptions () {
      return this.chosenBackground && this.chosenBackground.featOptions.map(({ name }) => name)
    }

    handleChangeName (newName: string) {
      this.$emit('updateCharacter', { name: newName })
    }

    handleChangeBackground (newBackground: string) {
      this.$emit('updateCharacter', { background: { name: newBackground, feat: { name: '' } } })
    }

    handleChangeBackgroundFeat (newFeat: string) {
      this.$emit('updateCharacter', { background: { feat: { name: newFeat } } })
    }
  }
</script>

<template lang="pug">
  div
    h1 Describe Your Character
    v-text-field(outlined, @change="handleChangeName", label="Name")
    v-autocomplete(
      :value="currentBackground.name",
      :items="backgroundChoices",
      label="Choose a background",
      @change="handleChangeBackground"
    )
    v-autocomplete(
      v-if="chosenBackground",
      :value="currentBackground.feat.name",
      :items="featOptions"
      label="Choose a feat",
      @change="handleChangeBackgroundFeat"
    )
    CharactersBackgroundDetail(v-if="currentBackground.name", :backgroundName="currentBackground.name", isHidingBack)
    h2.text-left.mt-5 TODO:
    ul.text-left
      li Image
      li Alignment
      li Background
        ul
          li Skills
          li * Tool Proficiencies
          li * Languages
      li Characteristics
</template>

<style module lang="scss">

</style>
