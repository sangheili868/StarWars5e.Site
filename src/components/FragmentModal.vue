<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import VueMarkdown from 'vue-markdown'
  import { namespace } from 'vuex-class'
  import { ReferenceTableType } from '@/types'

  const referenceTableModules = namespace('referenceTables')

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class FragmentModal extends Vue {
    @Prop(String) readonly title!: string
    @referenceTableModules.State referenceTables!: ReferenceTableType[]
    @referenceTableModules.Action fetchReferenceTables!: () => void

    created () {
      this.fetchReferenceTables()
    }

    get hash () {
      return decodeURI(this.$route.hash).substring(1)
    }

    get content () {
      const data = this.hash && this.referenceTables.find(({ name }) => name === this.hash)
      return data && data.content
    }

    handleClose () {
      this.$router.push({
        ...this.$route,
        hash: ''
      })
    }
  }
</script>

<template lang="pug">
  v-dialog(:value="hash && content", width="500")
    v-card(:class="$style.modal")
      v-card-title(primary-title).primary--text.headline.grey.lighten-2 {{ hash }}
      v-card-text
        VueMarkdown(:source="content")
      v-divider
      v-card-actions
        v-spacer
        v-btn(color="primary", flat, @click="handleClose") Close
</template>

<style module lang="scss">
  @import '@/assets/styles/colors.scss';

  .modal {
    background: $backgroundGradient;
  }
</style>
