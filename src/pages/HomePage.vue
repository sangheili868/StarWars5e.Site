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

    get books () {
      return [
        {
          to: 'rules/phb',
          title: 'The Player\'s Handbook',
          image: 'phb_cover',
          subText: 'The Player\'s Handbook mirrors the traditional 5th edition Player\'s Handbook, with some deviations for playing in the Star Wars Universe.',
          whatsDifferent: 'rules/phb/whatsDifferent'
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
          subText: 'Starships of the Galaxy features rules governing more in depth space adventuring, including rules for deploying in a spaceship, building and upgrading a spaceship, adventuring in a spaceship, and combat in a spaceship.'
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
          subText: 'The Rules tab includes the four existing books, broken down by chapter, for easier reading. Additionally, it has a link that includes all sponsored variant rules for Star Wars 5e. Finally, it has a link to Expanded Content—which is generally character options that aren\'t tied to a specific book yet—that is broken down by category.'
        },
        {
          to: 'characters',
          title: 'Characters',
          subText: 'The Characters tab includes all character options for Star Wars 5e, broken down by relevant section. The characters tab generally assumes you have read the books and understand the mechanics; it does not reiterate them, it just makes it easier to find all like content for character building in one place.'
        },
        {
          to: 'loot',
          title: 'Loot',
          subText: 'Loot has sections for all of the weapons, armor, and adventuring gear available across all of the books. Additionally, it has a filterable table for enhanced items.'
        },
        {
          to: 'starships',
          title: 'Starships',
          subText: 'Like the Characters tab, Starships includes all of the customization information for the mechanics implemented in Starships of the Galaxy.'
        },
        {
          to: 'tools',
          title: 'Tools',
          subText: 'The tools tab includes a character builder that is in development.'
        },
        {
          to: 'assets',
          title: 'Assets',
          subText: 'The Assets tab includes all of the links necessary for running and playing a Star Wars 5e game.',
          subSections: [
            {
              title: 'Source Books',
              subText: 'All four source books are linked here as PDFs, including a print friendly version of the Player\'s Handbook.'
            },
            {
              title: 'Expanded Content',
              subText: 'This includes GMBinder links to three of the expanded content documents for character options.'
            },
            {
              title: 'Sponsored Content',
              subText: 'Sponsored content is content created by members of the moderation team that hasn\'t been officially adopted, but should still be considered for use.'
            },
            {
              title: 'Character Sheets',
              subText: 'This includes the official character sheet as well as as form-fillable version.'
            },
            {
              title: 'Deployment and Starship Sheets',
              subText: 'As with character sheets, these are the official sheets for use in deployments and starships.'
            },
            {
              title: 'Podcasts and Other Media',
              subText: 'This includes links to any officially sponsored media related to Star Wars 5e, including Dungeon Jedi Masters—a podcast and more elucidating the Star Wars 5e experience.'
            },
            {
              title: 'Other',
              subText: 'This includes links to a teespring store where you can get some Star Wars 5e swag, a guide to printing the Player\'s Handbook (no other book is endorsed for printing yet), as well as some pre-generated characters.'
            }
          ]
        },
        {
          to: 'credits',
          title: 'Credits',
          subText: 'The credits tab is a comprehensive list of contributors to this project.'
        }
      ]
    }

    get socialLinks () {
      return [
        {
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
          channels: [
            {
              href: 'https://www.patreon.com/sw5e',
              icon: 'fab fa-patreon',
              title: 'Patreon'
            }
          ],
          subText: 'The Patreon is set up to cover the costs of the website. As a benefit of being a patron, you also get access to a special channel where you get to see finished products that haven\'t yet been released, and you get to vote on each week\'s expanded content release.'
        }
      ]
    }

    get themeToggleColor () {
      return this.isDarkSide ? this.$vuetify.theme.themes.light.secondary : 'primary'
    }

    getBookWrapperClasses (index: number) {
      let classes = []
      if (!['sm', 'xs'].includes(this.$vuetify.breakpoint.name) && index !== this.books.length - 1) {
        classes.push((this as any).$style.bookWrapper)
      }
      if (index % 2) {
        classes.push('flex-row-reverse')
      }
      return classes
    }

    toggleDarkSideTheme () {
      this.$vuetify.theme.dark = !this.isDarkSide
      this.toggleDarkSide(!this.isDarkSide)
    }
  }
</script>

<template lang="pug">
  div(:class="$style.homeContainer")
    h1(:class="$style.sw5eTitle") Star Wars 5e
    p Star Wars 5e is a comprehensive overhaul of Dungeons and Dragons 5th edition for a Star Wars campaign. It is built on the same mechanics as 5th edition, with those mechanics expanded. In these books, and on this website, you will find everything you need to run a Star Wars 5e campaign.
    div.text-left

      h1(:class="$style.sectionTitle") The Books
      p.px-3 Star Wars 5e is currently comprised of four books—The Player's Handbook, Scum and Villainy, Starships of the Galaxy, and Wretched Hives—with two more books planned.
      div(
        v-for="book, index in books",
        :key="book.title"
        :class="getBookWrapperClasses(index)"
      ).d-md-flex.align-center.justify-space-between
        div.pa-5.d-flex.flex-column.flex-grow-1
          h2 {{ book.title }}
          p {{ book.subText }}
          div(v-if="book.whatsDifferent").mt-5
            v-btn(:to="book.whatsDifferent", color="primary") What's Different?

        v-card(:to="book.to", hover, exact, height="100%", max-width="350", min-height="452", color="black").flex-shrink.mx-auto
          v-img(:src="require(`@/assets/${book.image}.jpg`)", :class="$style.image")

      h1(:class="$style.sectionTitle") The Website
      p.px-3 The website is designed to make this information present in the books more accessible for both players and GMs.
      div(v-for="sitePage in sitePages", :key="sitePage.title").my-3
        v-btn(:to="sitePage.to", color="primary", width="200") {{ sitePage.title }}
        div.ml-5 {{ sitePage.subText }}
          div(v-for="subSection in sitePage.subSections", :key="subSection.title").ml-5
            h4 {{ subSection.title }}
            div {{ subSection.subText }}

      h1(:class="$style.sectionTitle") Social Media
      p.px-3 Star Wars 5e has five social media channels. Any time there is a content update or expanded content release, I share it across all five channels simultaneously, so you can follow on whichever you prefer.
      div(v-for="socialLink in socialLinks", :key="subText").my-3
        div.d-flex.flex-wrap
          div(v-for="{ href, icon, title } in socialLink.channels", :key="title").ma-2
            a(:href="href", target="_blank")
              v-btn(light, width="150")
                v-icon(:color="title").mr-3 {{ icon }}
                | {{ title }}
        div.ml-5 {{ socialLink.subText }}
    v-btn(:color="themeToggleColor", @click="toggleDarkSideTheme").mt-5 Join the {{ isDarkSide ? 'Light' : 'Dark' }} Side
</template>

<style module lang="scss">
  @import "src/assets/styles/colors.scss";

  .homeContainer {
    max-width: 1185px;
    margin: auto;

    .sw5eTitle {
      font-size: 50px;
    }

    .sectionTitle {
      border-bottom: 2px solid $secondary;
      margin-top: 50px;
    }

    .bookWrapper {
      margin-bottom: -120px;
    }
  }

  .image {
    background-color: $black;
    min-width: 350px;
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
