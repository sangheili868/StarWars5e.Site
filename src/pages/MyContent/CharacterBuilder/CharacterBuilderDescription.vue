<script lang="ts">
  import VueMarkdown from 'vue-markdown'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { BackgroundType, FeatType } from '@/types/characterTypes'
  import { RawBackgroundType, RawCharacteristicsType } from '@/types/rawCharacterTypes'
  import CharactersBackgroundDetail from '@/pages/Characters/CharactersBackgroundDetail.vue'
  import { chain } from 'lodash'
  import MySelect from '@/components/MySelect.vue'
  import MyDialog from '@/components/MyDialog.vue'

  const featModule = namespace('feats')

  @Component({
    components: {
      CharactersBackgroundDetail,
      VueMarkdown,
      MySelect,
      MyDialog
    }
  })
  export default class CharacterBuilderDescription extends Vue {
    @Prop(Array) readonly backgrounds!: BackgroundType[]
    @Prop(Object) readonly currentBackground!: RawBackgroundType
    @Prop(String) readonly name!: string
    @Prop(String) readonly image!: string
    @Prop(Object) readonly characteristics!: RawCharacteristicsType

    @featModule.State feats!: FeatType[]
    @featModule.Action fetchFeats!: () => void

    isOpen = false

    created () {
      this.fetchFeats()
    }

    alignmentOptions = [
      'Lawful Light',
      'Neutral Light',
      'Chaotic Light',
      'Lawful Balanced',
      'Balanced Neutral',
      'Chaotic Balanced',
      'Lawful Dark',
      'Neutral Dark',
      'Chaotic Dark'
    ]

    characteristicsList = [
      'Personality Traits',
      'Ideal',
      'Bond',
      'Flaw',
      'Gender',
      'Place of Birth',
      'Age',
      'Height',
      'Weight',
      'Hair',
      'Eyes',
      'Skin',
      'Appearance',
      'Backstory'
    ]

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

    get featText () {
      const featName = this.currentBackground.feat && this.currentBackground.feat.name
      const featData = this.feats.find(({ name }) => name === featName)
      return featData ? featData.text : ''
    }

    handleChangeName (name: string) {
      this.$emit('updateCharacter', { name })
    }

    handleChangeImage (image: string) {
      this.$emit('updateCharacter', { image })
    }

    handleChangeCharacteristic (characteristic: string, newCharacteristic: string) {
      this.$emit('updateCharacter', { characteristics: { [characteristic]: newCharacteristic } })
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
    div.d-flex.mt-5
      div.flex-grow-1
        v-text-field(:value="name", outlined, label="Name", @change="handleChangeName")
        v-text-field(:value="image", outlined, label="Image URL", @change="handleChangeImage")
      v-img(
        v-if="image",
        :src="image",
        contain,
        max-height="175",
        max-width="175",
        min-width="100",
        alt="Character Image"
      )
    MySelect(
      :value="characteristics.alignment",
      :items="alignmentOptions",
      label="Choose an Alignment",
      @change="newAlignment => handleChangeCharacteristic('alignment', newAlignment)"
    )
    div.d-flex.align-center
      v-autocomplete(
        :value="currentBackground.name",
        :items="backgroundChoices",
        label="Choose a background",
        @change="handleChangeBackground"
      )
      MyDialog(v-if="currentBackground.name", v-model="isOpen", wide)
        template(v-slot:activator="{ on }")
          v-btn(v-on="on").ml-3 View Background Details
        template(#title) {{ currentBackground.name }}
        template(#text)
          CharactersBackgroundDetail(:backgroundName="currentBackground.name", isHidingBack).mt-3
        template(#actions)
          v-spacer
          v-btn(color="primary", text, @click="isOpen=false") Close
    MySelect(
      v-if="chosenBackground",
      :value="currentBackground.feat.name",
      :items="featOptions"
      label="Choose a feat",
      @change="handleChangeBackgroundFeat"
    )
    VueMarkdown(:source="featText").caption
    h3.mb-3 Characteristics
    v-text-field(
      v-for="characteristic in characteristicsList",
      :key="characteristic"
      :value="characteristics[characteristic]",
      outlined,
      hide-details,
      :label="characteristic",
      @change="newCharacteristic => handleChangeCharacteristic(characteristic, newCharacteristic)"
    ).mb-2
</template>
