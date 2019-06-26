import Vue from 'vue'
import Vuex from 'vuex'
import archetypes from './modules/archetypes'
import armor from './modules/armor'
import backgrounds from './modules/backgrounds'
import blobs from './modules/blobs'
import classes from './modules/classes'
import credits from './modules/credits'
import deployments from './modules/deployments'
import feats from './modules/feats'
import gear from './modules/gear'
import monsters from './modules/monsters'
import powers from './modules/powers'
import species from './modules/species'
import referenceTables from './modules/referenceTable'
import starshipEquipment from './modules/starshipEquipment'
import starshipModifications from './modules/starshipModifications'
import starshipSizes from './modules/starshipSizes'
import starshipWeapons from './modules/starshipWeapons'
import ui from './modules/ui'
import ventures from './modules/ventures'
import weapons from './modules/weapons'
import weaponProperties from './modules/weaponProperties'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    archetypes,
    armor,
    backgrounds,
    blobs,
    classes,
    credits,
    deployments,
    feats,
    gear,
    monsters,
    powers,
    species,
    referenceTables,
    starshipEquipment,
    starshipModifications,
    starshipSizes,
    starshipWeapons,
    ui,
    ventures,
    weapons,
    weaponProperties,
    search
  }
})
