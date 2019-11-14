<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const uiModule = namespace('ui')

  interface NavItem {
    title: string
    icon: string
    route: string,
    items?: NavItem[]
  }

  @Component
  export default class NavigationDrawer extends Vue {
    @uiModule.State isSideBarOpen!: boolean
    @uiModule.Action updateSideBar!: (value: boolean) => void

    @Prop(Array) readonly items!: NavItem[]
    @Prop(String) readonly baseRoute!: string

    get darkSideItemColors () {
      return this.$vuetify.theme.dark ? {} : {
        'active-class': 'primary--text',
        ripple: { 'class': 'primary--text' }
      }
    }

    hasSubItems ({ items }: NavItem) {
      return items && items.length
    }

    buildComponentProps (item: NavItem) {
      return this.hasSubItems(item) ? {
        is: 'v-list-group',
        color: this.$vuetify.theme.dark ? '' : 'primary',
        class: 'listGroupHeader',
        ripple: false
      } : {
        is: 'v-list-item',
        exact: item.route === this.baseRoute,
        to: item.route,
        ...this.darkSideItemColors
      }
    }
  }
</script>

<template lang="pug">
  v-navigation-drawer(
    :value="isSideBarOpen",
    :permanent="$vuetify.breakpoint.mdAndUp",
    fixed,
    app,
    clipped,
    :class="$vuetify.breakpoint.mdAndUp && $style.drawer",
    @input="updateSideBar"
  )
    v-list(dense, nav).dense
      component(v-for="(item, index) in items", :key="index", v-bind="buildComponentProps(item)")
        template(v-if="hasSubItems(item)" v-slot:activator)
          v-list-item(:to="item.route", v-bind="darkSideItemColors").mb-0
            v-list-item-icon
              v-icon(:class="$style.icon") {{ item.icon }}
            v-list-item-title {{ item.title }}
        template(v-if="hasSubItems(item)")
          v-list-item(
            v-for="(subitem, index) in item.items",
            :key="index",
            :to="subitem.route",
            v-bind="darkSideItemColors"
          ).ml-5
            v-list-item-icon(v-if="subitem.icon")
              v-icon {{ subitem.icon }}
            v-list-item-title {{ subitem.title }}
        template(v-else)
          v-list-item-icon
            v-icon(:class="$style.icon") {{ item.icon }}
          v-list-item-title {{ item.title }}
</template>

<style module lang="scss">
  .drawer {
    z-index: auto !important;

    .group {
      padding-left: 0;
    }

    .icon {
      text-align: center;
      width: 30px;
    }
  }
</style>
<style lang="scss">
  .listGroupHeader .v-list-group__header.v-list-item {
    padding-left: 0;
  }
</style>
