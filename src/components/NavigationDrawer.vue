<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const uiModule = namespace('ui')

  interface NavItem {
    title: string
    icon: string
    route: string
  }

  @Component
  export default class NavigationDrawer extends Vue {
    @uiModule.State isSideBarOpen!: boolean
    @uiModule.Action updateSideBar!: (value: boolean) => void

    @Prop(Array) readonly items!: NavItem[]
    @Prop(String) readonly baseRoute!: string
  }
</script>

<template lang="pug">
  v-navigation-drawer(:value="isSideBarOpen", :permanent="$vuetify.breakpoint.mdAndUp", fixed, app, clipped @input="updateSideBar")
    v-list.dense
      v-list-tile(v-for="item in items", :key="item.title", :to="item.route" :exact="item.route === baseRoute")

        v-list-tile-action
          v-icon(:class="$style.icon") {{ item.icon }}

        v-list-tile-content
          v-list-tile-title {{ item.title }}
</template>

<style module lang="scss">
  .icon {
    text-align: center;
    width: 30px;
  }
</style>
