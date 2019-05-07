<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'
  import RoutesList from '@/components/RoutesList.vue'
  import CardSet from '@/components/CardSet.vue'

  @Component({
    components: {
      RoutesList,
      CardSet
    }
  })
  export default class HomePage extends Vue {
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
          to: 'handbook',
          title: 'Player\' Handbook',
          image: 'phb_cover'
        },
        {
          to: 'reference/monsters',
          title: 'Monster Manual',
          image: 'mm_cover'
        },
        {
          to: 'starships',
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
        v-img(:src="`https://starwars5e.blob.core.windows.net/site-images/other/${card.image}.jpg`")
    p
      | What is Star Wars 5e? It's a full conversion for Dungeons and Dragon Fifth Edition to the Star Wars Universe.
      | Here you can find rules on creating a lightsaber-swinging jedi sentinel, a devil-may-care smuggler operative, or
      | a droid-hacking engineer. There's also a full collection of Star Wars monsters, NPCs, and constructs to fight
      | against. Ready to take to the stars? All the rules on piloting and customizing your very own spaceship are here
      | too. If you want to help contribute to this conversion, join one of the active communities at the links below!
    div(:class="$style.routes").mb-5
      a(v-for="{ href, icon, title, author } in socialLinks", :key="title", :href="href", target="_blank")
        v-btn
          v-icon(:color="title").mr-3 {{ icon }}
          | {{ title }}
</template>

<style module lang="scss">
  .routes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
