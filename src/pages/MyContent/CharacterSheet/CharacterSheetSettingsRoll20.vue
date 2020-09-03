<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { CompleteCharacterType } from '@/types/completeCharacterTypes'
  import { RawCharacterType } from '@/types/rawCharacterTypes'
  import MyDialog from '@/components/MyDialog.vue'
  import { saveAs } from 'file-saver'
  import { camelCase, map } from 'lodash'

  @Component({
    components: {
      MyDialog
    }
  })
  export default class CharacterSheetSettingsRoll20 extends Vue {
  @Prop(Object) readonly completeCharacter!: CompleteCharacterType;
  @Prop(Object) readonly rawCharacter!: RawCharacterType
  isOpen = false

  get jsonData () {
    const c = this.completeCharacter
    const r = this.rawCharacter
    console.log(r)
    const attribs = {
      version: '2.4',
      class: r.classes[0].name,
      subclass: r.classes[0].archetype ? r.classes[0].archetype.name : '',
      base_level: r.classes[0].levels,
      race: c.species,
      experience: c.experiencePoints.current.toString()
    }
    return {
      schema_version: 1,
      name: c.name,
      avatar: c.image,
      bio: c.characteristics.Backstory,
      exportedBy: 'www.sw5e.com',
      attribs: map(attribs, (current, name) => ({ name, current }))
    }
  }

  saveToFile () {
    saveAs(
      new Blob([JSON.stringify(this.jsonData, null, 2)], {
        type: 'text/plain;charset=utf-8;'
      }),
      camelCase(this.completeCharacter.name) + '_roll20.json'
    )
  }
  }
</script>

<template lang="pug">
  MyDialog(v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on").ma-2 Export to Roll20
    template(#title) Export Character to Roll 20
    template(#text)
      h2.mt-3 Instructions
      div.caption You must be the GM of the campaign to import a character
      ol
        li Ensure that the Roll 20 Campaign is using the
          u.pl-1
            a(href="https://wiki.roll20.net/StarWars5E-Sheet", target="_blank") SW5E character sheet
        li Install #[strong Firefox] and the
          u.pl-1
            a(href="https://addons.mozilla.org/en-US/firefox/addon/roll20-character-import-export/", target="_blank") Roll20 Character Import/Export Extension
        li Click "Save File" below to download the character File
        li Go to the Roll 20 campaign and open the journal tab
        li At the bottom of the journal tab, under "Import Character", click "Browse"
        li Open the file you downloaded from this pop-up
        li Click the "Import Character" button that appears once the file is opened
    template(#actions)
      v-btn.mt-3(color="primary", @click="saveToFile") Save file
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Close
</template>

<style module lang="scss">
</style>
