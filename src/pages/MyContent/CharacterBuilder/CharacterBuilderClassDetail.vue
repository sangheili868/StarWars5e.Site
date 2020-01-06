<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ClassType } from '@/types/characterTypes.ts'
  import ClassDetail from '@/components/ClassDetail.vue'
  import CharactersArchetypeDetail from '@/pages/Characters/CharactersArchetypeDetail.vue'
  import MyDialog from '@/components/MyDialog.vue'

  @Component({
    components: {
      MyDialog,
      ClassDetail,
      CharactersArchetypeDetail
    }
  })
  export default class CharacterBuilderClassDetail extends Vue {
    @Prop(Object) readonly classData!: ClassType
    @Prop(String) readonly archetypeName!: String

    isClassOpen = false
    isArchetypeOpen = false
  }
</script>

<template lang="pug">
  div.text-left
    MyDialog(v-model="isClassOpen", wide)
      template(v-slot:activator="{ on }")
        v-btn(v-on="on") View Class Details
      template(#title) {{ classData.name }}
      template(#text)
        ClassDetail(v-bind="{ classData }", isHidingBack).mt-5
      template(#actions)
        v-spacer
        v-btn(color="primary", text, @click="isClassOpen=false") Close
    MyDialog(v-if="archetypeName", v-model="isArchetypeOpen", wide).ml-3
      template(v-slot:activator="{ on }")
        v-btn(v-on="on") View Archetype Details
      template(#title) {{ archetypeName }}
      template(#text)
        CharactersArchetypeDetail(v-bind="{ archetypeName }", isHidingBack).mt-5
      template(#actions)
        v-spacer
        v-btn(color="primary", text, @click="isArchetypeOpen=false") Close
</template>
