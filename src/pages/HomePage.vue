<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const uiModule = namespace('ui')

  @Component
  export default class HomePage extends Vue {
    @uiModule.State isDarkSide!: boolean
    @uiModule.Action toggleDarkSide!: (value: boolean) => Promise<void>

    book = 0

    get books () {
      return [
        {
          to: 'rules/phb',
          title: 'The Player\'s Handbook',
          image: 'phb_cover',
          subText: 'The Player\'s Handbook mirrors the traditional 5th edition Player\'s Handbook, with some deviations for playing in the Star Wars Universe.'
        },
        {
          to: 'rules/snv',
          title: 'Scum and Villainy',
          image: 'sav_cover',
          subText: 'Scum and Villainy includes a menagerie of Star Wars-themed monsters and villains.'
        },
        {
          to: 'rules/sotg',
          title: 'Starships of the Galaxy',
          image: 'sotg_cover',
          subText: 'Starships of the Galaxy features rules governing spaceships, space adventuring, and space combat.'
        },
        {
          to: 'rules/wh',
          title: 'Wretched Hives',
          image: 'wh_cover',
          subText: 'Wretched Hives adds rules for new downtime activities, running factions, and introduces enhanced items.'
        }
      ]
    }

    get sitePages () {
      return [
        {
          to: 'rules',
          title: 'Rules',
          icon: 'fa-journal-whills',
          subText: 'The four books, broken down by chapter, as well as a link to some SW5e variant rules.'
        },
        {
          to: 'characters',
          title: 'Characters',
          icon: 'fa-users',
          subText: 'Everything you need for your character, from fighting styles to force powers.'
        },
        {
          to: 'loot',
          title: 'Loot',
          icon: 'fa-toolbox',
          subText: 'Grab your blaster, a nice suit of armor, a few thermal detonators, and take on the galaxy! Also, check out the tab for enhanced items.'
        },
        {
          to: 'starships',
          title: 'Starships',
          icon: 'fa-rocket',
          subText: 'Just like the characters tab, but for your ship. Hyperdrives, quad-cannons, and navicomputers -- it\'s all here.'
        },
        {
          to: 'tools',
          title: 'Tools',
          icon: 'fa-edit',
          subText: 'Create your character right here on the SW5e website! (Currently in development)'
        },
        {
          to: 'assets',
          title: 'Assets',
          icon: 'fa-file-download',
          subText: 'Downloadable pdfs, character sheets, podcasts and more.'
        },
        {
          to: 'credits',
          title: 'Credits',
          icon: 'fa-list',
          subText: 'A comprehensive list of contributors to the SW5e project.'
        }
      ]
    }

    get socialLinks () {
      return [
        {
          title: 'Development',
          channels: [
            {
              href: 'https://discord.gg/zYcPYTu',
              icon: 'fab fa-discord',
              title: 'Discord'
            }
          ],
          subText: 'Discord is where the development occurs. If you have questions that you\'ve otherwise not been able to find answers to, or you want to develop content for Star Wars 5e, this is the place to do it.'
        },
        {
          title: 'Connect',
          channels: [
            {
              href: 'https://www.reddit.com/r/sw5e',
              icon: 'fab fa-reddit',
              title: 'Reddit'
            },
            {
              href: 'https://twitter.com/Galiphile',
              icon: 'fab fa-twitter',
              title: 'Twitter'
            },
            {
              href: 'https://www.facebook.com/groups/starwars5e',
              icon: 'fab fa-facebook',
              title: 'Facebook'
            }
          ],
          subText: 'These three channels are used for sharing Star Wars 5e content, questions, and more.'
        },
        {
          title: 'Support',
          channels: [
            {
              href: 'https://www.patreon.com/noble_delta_squad_dev_team',
              icon: 'fab fa-patreon',
              title: 'Patreon'
            }
          ],
          subText: 'The Patreon is set up to cover the costs of this website. It supports Delta Squad, the team that manages this site and n7.world, a Mass Effect 5e conversion. As a Patron, you can choose to have your contribution go towards this site, n7.world, or both.'
        }
      ]
    }

    get themeToggleColor () {
      return this.isDarkSide ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.dark.background
    }

    toggleDarkSideTheme () {
      this.$vuetify.theme.dark = !this.isDarkSide
      this.toggleDarkSide(!this.isDarkSide)
    }
  }
</script>

<template lang="pug">
  div
    div(:class="$style.hero")
      v-parallax(:src="require(`@/assets/hero${isDarkSide ? '-dark' : ''}.jpg`)")
        v-row(align="center", justify="center")
          v-col.d-flex.align-center.flex-column
            v-img(:src="require('@/assets/sw5e-logo.png')", max-width="300").mb-5
            div(:class="$style.heroText").mt-5 Welcome to Star Wars 5e, a comprehensive overhaul of Dungeons and Dragons 5th edition for a Star Wars campaign. It is built on the same mechanics as 5th edition, with those mechanics expanded. In these books, and on this website, you will find everything you need to run a Star Wars 5e campaign.
      div(:class="$style.shadow")
    div(:class="$style.homeContainer").text-left

      h1(:class="$style.sectionTitle") The Rulebooks
      p Star Wars 5e is currently comprised of four books—The Player's Handbook, Scum and Villainy, Starships of the Galaxy, and Wretched Hives—with two more books planned.
      div(v-if="$vuetify.breakpoint.mdAndUp").d-flex.justify-space-between
        v-card(
          v-for="book, index in books",
          :key="book.title"
          :to="book.to",
          hover,
          exact,
          max-width="20%",
          color="black"
        )
          v-hover(v-slot="{ hover }")
            v-img(:src="require(`@/assets/${book.image}.jpg`)", :class="$style.image")
              v-expand-transition
                div(v-if="hover", :class="$style.imageCover").text-center.transition-fast-in-fast-out.d-flex.flex-column
                  component(
                    :is="$vuetify.breakpoint.lgAndUp ? 'h2' : 'h4'",
                    :class="$vuetify.breakpoint.lgAndUp ? $style.imageCoverHeaderBig : $style.imageCoverHeader"
                  ).pt-5.px-3 {{ book.title }}
                  p(:class="$vuetify.breakpoint.lgAndUp ? '' : $style.imageSmallText").flex-grow-1.px-5 {{ book.subText }}
                  v-btn(color="primary").mx-5.mb-5 Read More
      div(v-else).pa-3.elevation-10.rounded-lg
        v-slide-group(v-model="book", center-active, mandatory)
          v-slide-item(v-for="book, index in books", :key="book.title", v-slot="{ active, toggle }")
            div(v-ripple, @click="toggle").mx-3.rounded
              v-img(
                :src="require(`@/assets/${book.image}.jpg`)",
                :class="[$style.image, active ? '' : $style.inactive]",
                max-width="200px"
              ).rounded
        div.mt-3.text-center
          h2.mb-2 {{ books[book].title }}
          div {{ books[book].subText }}
          v-btn(color="primary", :to="books[book].to", exact).mt-5 Read More

      h1(:class="$style.sectionTitle") The Website
      p The website is designed to make this information present in the books more accessible for both players and GMs.
      div.d-flex.flex-wrap.justify-space-around
        div(v-for="sitePage in sitePages", :key="sitePage.title", :class="$style.sitePage").d-flex.flex-column.align-center.mb-5
          v-btn(:to="sitePage.to", color="primary", width="200").mb-3
            v-icon.mr-3 {{ sitePage.icon }}
            div {{ sitePage.title }}
          div {{ sitePage.subText }}

      h1(:class="$style.sectionTitle") Getting in Touch
      p Star Wars 5e has five social media channels. Any time there is a content update or expanded content release, I share it across all five channels simultaneously, so you can follow on whichever you prefer.
      v-row
        v-col(v-for="socialLink in socialLinks", :key="socialLink.subText", cols="12", md="4").d-flex.flex-column.align-center
          h1 {{ socialLink.title }}
          div.mb-5 {{ socialLink.subText }}
          div(v-for="{ href, icon, title } in socialLink.channels", :key="title").ma-2
            a(:href="href", target="_blank")
              v-btn(light, width="150")
                v-icon(:color="title").mr-3 {{ icon }}
                | {{ title }}
    v-btn(:color="themeToggleColor", @click="toggleDarkSideTheme").mt-5.white--text Join the {{ isDarkSide ? 'Light' : 'Dark' }} Side
</template>

<style module lang="scss">
  @import "src/assets/styles/colors.scss";

  .hero {
    margin: -12px -12px 0 -12px;
    position: relative;

    .heroText {
      max-width: 600px;
    }

    .shadow {
      box-shadow:
        inset 0 10px 13px 20px rgba(0,0,0,.2),
        inset 0 20px 31px 20px rgba(0,0,0,.14),
        inset 0 8px 38px 20px rgba(0,0,0,.12);
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  .homeContainer {
    max-width: 1185px;
    margin: auto;

    .sectionTitle {
      border-bottom: 2px solid $secondary;
      margin-top: 60px;
      margin-bottom: 5px;
    }

    .image {
      background-color: $black;
      height: 100%;
      opacity: 1;

      &.inactive {
        opacity: 0.3;
        transition: opacity 1s;
      }

      .imageCover {
        background-color: $background;
        height: 100%;
        opacity: 0.95;
        bottom: 0;
        position: absolute;

        .imageSmallText {
          font-size: 12px;
        }

        .imageCoverHeader {
          min-height: 60px;
        }

        .imageCoverHeaderBig {
          min-height: 80px;
        }
      }
    }

    .sitePage {
      max-width: 300px;
    }
  }
</style>
