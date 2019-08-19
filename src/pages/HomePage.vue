<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import RoutesList from '@/components/RoutesList.vue'
  import CardSet from '@/components/CardSet.vue'
  import { omit } from 'lodash'

  const uiModule = namespace('ui')

  @Component({
    components: {
      RoutesList,
      CardSet
    }
  })
  export default class HomePage extends Vue {
    @uiModule.State isDarkSide!: boolean
    @uiModule.Action toggleDarkSide!: (value: boolean) => Promise<void>

    get darkSideModel () {
      return this.isDarkSide
    }

    set darkSideModel (value: boolean) {
      this.toggleDarkSide(value)
    }

    get socialLinks () {
      return [
        {
          href: 'https://www.reddit.com/r/sw5e',
          icon: 'fab fa-reddit',
          title: 'Reddit'
        },
        {
          href: 'https://discord.gg/zYcPYTu',
          icon: 'fab fa-discord',
          title: 'Discord'
        },
        {
          href: 'https://twitter.com/Galiphile',
          icon: 'fab fa-twitter',
          title: 'Twitter'
        },
        {
          href: 'https://www.patreon.com/sw5e',
          icon: 'fab fa-patreon',
          title: 'Patreon'
        }
      ]
    }

    get books () {
      return [
        {
          to: 'rules/handbook',
          title: 'Player\' Handbook',
          image: 'phb_cover'
        },
        {
          to: 'rules/monsters',
          title: 'Monster Manual',
          image: 'mm_cover'
        },
        {
          to: 'rules/starships',
          title: 'Starships of the Galaxy',
          image: 'sotg_cover'
        }
      ]
    }
  }
</script>

<template lang="pug">
  div
    h1 Star Wars 5e
    CardSet(:cards="books")
      template(v-slot="{ card }")
        v-img(:src="require(`@/assets/${card.image}.jpg`)", :class="$style.image")
    p
      | What is Star Wars 5e? It's a full conversion for Dungeons and Dragon Fifth Edition to the Star Wars universe.
      | Here you can find rules on creating a lightsaber-swinging jedi sentinel, a devil-may-care smuggler operative, or
      | a droid-hacking engineer. There's also a full collection of Star Wars monsters, NPCs, and constructs to fight
      | against. Ready to take to the stars? All the rules on piloting and customizing your very own spaceship are here
      | too. If you want to help contribute to this conversion, join one of the active communities at the links below!
    div(:class="$style.routes").mb-5
      a(v-for="{ href, icon, title, author } in socialLinks", :key="title", :href="href", target="_blank")
        v-btn(light)
          v-icon(:color="title").mr-3 {{ icon }}
          | {{ title }}
    v-switch(
      label="Join the Dark Side",
      color="red darken-3",
      :class="$style.darkSideSwitch",
      v-model="darkSideModel"
    )
</template>

<style module lang="scss">
  @import "src/assets/styles/colors.scss";

  .image {
    background-color: $black;
  }

  .routes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .darkSideSwitch {
    justify-content: center;
  }
</style>
