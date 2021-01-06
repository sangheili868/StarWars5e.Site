import Vue from 'vue'
import Vuex from 'vuex'
import archetypes from './modules/archetypes'
import dataVersions from './modules/dataVersions'
import armorProperties from './modules/armorProperties'
import backgrounds from './modules/backgrounds'
import blobs from './modules/blobs'
import classes from './modules/classes'
import deployments from './modules/deployments'
import enhancedItems from './modules/enhancedItems'
import feats from './modules/feats'
import features from './modules/features'
import fightingStyles from './modules/fightingStyles'
import fightingMasteries from './modules/fightingMasteries'
import equipment from './modules/equipment'
import lightsaberForms from './modules/lightsaberForms'
import monsters from './modules/monsters'
import powers from './modules/powers'
import species from './modules/species'
import referenceTables from './modules/referenceTable'
import searchResults from './modules/searchResults'
import starshipEquipment from './modules/starshipEquipment'
import starshipModifications from './modules/starshipModifications'
import starshipSizes from './modules/starshipSizes'
import ui from './modules/ui'
import ventures from './modules/ventures'
import weaponProperties from './modules/weaponProperties'
import character from './modules/character'
import { VuexPersistence } from 'vuex-persist'
import characterAdvancements from './modules/characterAdvancements'
import conditions from './modules/conditions'
import skills from './modules/skills'
import authentication from './modules/authentication'
import localforage from 'localforage'
import _ from 'lodash'

Vue.use(Vuex)

const modules = {
  archetypes,
  authentication,
  dataVersions,
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
  features,
  fightingMasteries,
  fightingStyles,
  equipment,
  lightsaberForms,
  monsters,
  powers,
  species,
  referenceTables,
  searchResults,
  skills,
  starshipEquipment,
  starshipModifications,
  starshipSizes,
  ui,
  ventures,
  weaponProperties
}

const persistToLocalStorage = new VuexPersistence({
  storage: window.localStorage,
  modules: ['ui']
})

const persistToIndexedDB = new VuexPersistence({
  storage: localforage,
  asyncStorage: true,
  modules: _.pull(Object.getOwnPropertyNames(modules), 'ui')
})

export default new Vuex.Store({
  plugins: [persistToIndexedDB.plugin, persistToLocalStorage.plugin],
  modules: modules
})
