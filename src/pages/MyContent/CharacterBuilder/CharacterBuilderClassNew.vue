<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import MyDialog from '@/components/MyDialog.vue'
  import MySelect from '@/components/MySelect.vue'
  import { ClassType } from '@/types/characterTypes'
  import { RawClassType } from '@/types/rawCharacterTypes'
  import { range } from 'lodash'

  @Component({
    components: {
      MyDialog,
      MySelect
    }
  })
  export default class CharacterBuilderClassNew extends Vue {
    @Prop(Array) readonly classes!: ClassType[]
    @Prop(Array) readonly currentClasses!: RawClassType[]
    @Prop(Number) readonly currentLevel!: number

    isOpen = false
    chosenClass = ''
    chosenLevel = 0
    range = range

    get classChoices () {
      const currentClassList = this.currentClasses.map(({ name }) => name)
      return this.classes.map(({ name }) => name).filter(name => !currentClassList.includes(name))
    }

    resetValues () {
      this.chosenClass = ''
      this.chosenLevel = 0
    }

    handleAdd () {
      this.$emit('add', { name: this.chosenClass, levels: this.chosenLevel })
      this.isOpen = false
    }
  }
</script>

<template lang="pug">
  MyDialog(v-if="currentLevel < 20", v-model="isOpen")
    template(v-slot:activator="{ on }")
      v-btn(color="primary", v-on="on", @click="resetValues").mt-3 Add New Class
    template(#title) Add New Class
    template(#text)
      MySelect(v-model="chosenClass", :items="classChoices", label="Choose a class")
      MySelect(v-model="chosenLevel", :items="range(1, 21 - currentLevel)", label="Number of levels in this class")
    template(#actions)
      v-btn(color="primary", :disabled="!chosenLevel || !chosenClass", @click="handleAdd") Add Class
      v-spacer
      v-btn(color="primary", text, @click="isOpen=false") Cancel
</template>
