<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import SearchTable from '@/components/SearchTable.vue'
  import LinkModal from '@/components/LinkModal.vue'
  import { WeaponType, WeaponPropertyType } from '@/types'
  import _ from 'lodash'
  import VueMarkdown from 'vue-markdown'

  const weaponsModule = namespace('weapons')
  const weaponPropertiesModule = namespace('weaponProperties')

  interface WeaponPropertyModal extends WeaponPropertyType {
    text: string
  }

  @Component({
    components: {
      SearchTable,
      VueMarkdown,
      LinkModal
    }
  })
  export default class LootWeapons extends Vue {
    @weaponsModule.State weapons!: WeaponType[]
    @weaponsModule.Action fetchWeapons!: () => void
    @weaponPropertiesModule.State weaponProperties!: WeaponPropertyType[]
    @weaponPropertiesModule.Action fetchWeaponProperties!: () => void
    initialSearch: string | (string | null)[] = ''

    created () {
      this.fetchWeapons()
      this.fetchWeaponProperties()
      this.initialSearch = this.$route.query.search
    }

    get items () {
      return _(this.weapons)
        .map(weapons => ({
          ...weapons,
          id: weapons.name,
          isExpandable: true
        })).value()
    }

    get headers () {
      return [
        { text: 'Name', value: 'name' },
        {
          text: 'Type',
          value: 'weaponClassification',
          render: _.startCase,
          filterChoices: ['Simple Blaster', 'Martial Blaster', 'Simple Lightweapon', 'Martial Lightweapon', 'Simple Vibroweapon', 'Martial Vibroweapon'],
          filterFunction: ({ weaponClassification }: WeaponType, filterValue: string) => _.startCase(weaponClassification) === filterValue
        },
        { text: 'Cost', value: 'cost' },
        { text: 'Weight', value: 'weight' },
        { text: 'Damage', value: 'damageNumberOfDice', render: this.weaponDamage },
        {
          text: 'Source',
          value: 'contentType',
          render: _.startCase,
          filterChoices: ['Core', 'Expanded Content'],
          filterFunction: ({ contentType }: WeaponType, filterValue: string) => _.startCase(contentType) === filterValue
        }
      ]
    }

    weaponDamage (field: string, fields: WeaponType) {
      return fields.damageNumberOfDice ? `${fields.damageNumberOfDice}d${fields.damageDieType} ${fields.damageType}` : 'Special'
    }

    weaponText (properties: string[]) {
      return properties.map((propertyString, index) => {
        const propertyName = _.upperCase(propertyString.split(' ')[0])
        const text = (index > 0 ? ', ' : ' ') + propertyString
        const propertyInfo = this.weaponProperties.find(({ name }) => _.upperCase(name) === propertyName)
        return { ...propertyInfo, text } as WeaponPropertyModal
      }).filter(({ content }) => content)
    }
  }
</script>

<template lang="pug">
  div
    h1 Weapons
    br
    SearchTable(v-bind="{ headers, items, initialSearch }")
      template(v-slot:default="props")
        strong Properties:
        LinkModal(
          v-for="({ name, content, text }) in weaponText(props.item.properties)",
          :key="name",
          :link="text"
        )
          VueMarkdown(:source="content")
        span(v-if="weaponText(props.item.properties).length === 0")  None
        VueMarkdown(v-if="props.item.description", :source="props.item.description")
        div(v-for="(mode, index) in props.item.modes", :key="index").
          #[strong {{ mode.name }}:] {{ weaponDamage('', mode) }}, {{ mode.properties.join(', ') }}
</template>
