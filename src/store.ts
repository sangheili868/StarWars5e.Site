import Vue from 'vue'
import Vuex from 'vuex'
import archetypes from './modules/archetypes'
import armor from './modules/armor'
import armorProperties from './modules/armorProperties'
import backgrounds from './modules/backgrounds'
import blobs from './modules/blobs'
import classes from './modules/classes'
import deployments from './modules/deployments'
import enhancedItems from './modules/enhancedItems'
import feats from './modules/feats'
import gear from './modules/gear'
import equipment from './modules/equipment'
import monsters from './modules/monsters'
import powers from './modules/powers'
import species from './modules/species'
import referenceTables from './modules/referenceTable'
import searchResults from './modules/searchResults'
import starshipEquipment from './modules/starshipEquipment'
import starshipModifications from './modules/starshipModifications'
import starshipSizes from './modules/starshipSizes'
import starshipWeapons from './modules/starshipWeapons'
import ui from './modules/ui'
import ventures from './modules/ventures'
import weapons from './modules/weapons'
import weaponProperties from './modules/weaponProperties'
import character from './modules/character'
import createPersistedState from 'vuex-persistedstate'
import characterAdvancements from './modules/characterAdvancements'
import conditions from './modules/conditions'
import skills from './modules/skills'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    archetypes,
    armor,
    armorProperties,
    backgrounds,
    blobs,
    character,
    characterAdvancements,
    classes,
    conditions,
    deployments,
    enhancedItems,
    feats,
    gear,
    equipment,
    monsters,
    powers,
    species,
    referenceTables,
    searchResults,
    skills,
    starshipEquipment,
    starshipModifications,
    starshipSizes,
    starshipWeapons,
    ui,
    ventures,
    weapons,
    weaponProperties
  }
})
