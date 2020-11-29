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

  }
</script>

<template lang="pug">
  div.text-left
</template>
