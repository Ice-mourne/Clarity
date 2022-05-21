import { BungieManifest } from '@interfaces/ts/manifest/bungieManifest'
import { InventoryItem } from '@interfaces/ts/manifest/clarityManifest'
import { InventoryItemFixes } from '@ts/improvedBungieData/fixedBungieData'
import _ from 'lodash'
import { convertItems } from './convertItems'
import { convertSocketType } from './convertSocketType'
import { extraInvItem } from './extraInvItem'
import { getPerksAndShit } from './perks'
import { getPlugSet } from './plugSet'
import { getStatGroup } from './statGroup'
import { getStatNames } from './getStatNames'

export function convertBungieManifest(manifest: BungieManifest) {
   const inventoryItem = _.merge(manifest.DestinyInventoryItemDefinition, InventoryItemFixes)
   const powerCap = manifest.DestinyPowerCapDefinition

   const socketType = convertSocketType(manifest)

   const newItems: { [key: string]: InventoryItem } = {}
   const extra: { [key: string]: any } = {}
   for (const index in inventoryItem) {
      const item = inventoryItem[index]

      extra[index] = extraInvItem(item, manifest)

      const powerCapAboveLimit = item.quality?.versions.some((power) => {
         if (powerCap[power.powerCapHash].powerCap < 9999) return false
         return true
      })

      if (!powerCapAboveLimit) continue // skip items with power cap > 1060 // some items don't have collectible hash
      if (item.inventory.tierTypeName?.match(/Common|Uncommon|Rare/)) continue // skip Common, Uncommon, Rare items

      if (item.itemType === 2 || item.itemType === 3 || item.itemType === 30) newItems[index] = convertItems(item, manifest, socketType)
   }
   const plugSet = getPlugSet(manifest, newItems)
   const statGroup = getStatGroup(manifest)
   const statNames = getStatNames(manifest)
   const perksAndStuff = getPerksAndShit(manifest, plugSet, newItems)

   return {
      items: newItems,
      perksAndStuff: Object.assign(extra, perksAndStuff),
      plugSet,
      statGroup,
      statNames
   }
}
