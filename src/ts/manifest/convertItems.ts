import { BungieInventoryItem, BungieInventoryItemStat, BungieManifest } from '@interfaces/ts/manifest/bungieManifest'

import { InventoryItem } from '@interfaces/ts/manifest/clarityManifest'
import heavyAmmo from '@assets/ammoSVG/heavy.svg'
import primaryAmmo from '@assets/ammoSVG/primary.svg'
import specialAmmo from '@assets/ammoSVG/special.svg'
import { statBlacklist } from '@ts/improvedBungieData/dataForLookup'

export function convertItems (itemWeapon: BungieInventoryItem, manifest: BungieManifest, socketType: { [key: string]: string }) {
   const item = itemWeapon
   const inventoryBucket = manifest.DestinyInventoryBucketDefinition
   const damageType = manifest.DestinyDamageTypeDefinition
   const breakerType = manifest.DestinyBreakerTypeDefinition

   const stats = (stats: { [key: string]: BungieInventoryItemStat }) =>
      Object.values(stats).flatMap((stat) => {
         if (statBlacklist.includes(stat.statHash)) return [] // remove pointless stats
         return {
            statHash: stat.statHash,
            value: stat.value
         }
      })

   const getAmmoType = () => {
      // browser can use decoded svg but it will fuck up colors
      const decodeSVG = (svg: string) => `data:image/svg+xml,${atob(svg.replace('data:image/svg+xml;base64,', ''))}`

      switch (item.equippingBlock?.ammoType) {
      case 1:
         return {
            icon: decodeSVG(primaryAmmo),
            name: 'Primary'
         }
      case 2:
         return {
            icon: decodeSVG(specialAmmo),
            name: 'Special'
         }
      case 3:
         return {
            icon: decodeSVG(heavyAmmo),
            name: 'Heavy'
         }
      default:
         return undefined
      }
   }

   const sockets = () => {
      return item.sockets?.socketEntries.map((socket) => {
         if (socket.socketTypeHash === 0) {
            return {
               socketType: 'unknown'
            }
         }

         return {
            randomizedPlugSetHash: socket.randomizedPlugSetHash,
            reusablePlugItems: socket.reusablePlugItems.map((item) => item.plugItemHash),
            reusablePlugSetHash: socket.reusablePlugSetHash,
            singleInitialItemHash: socket.singleInitialItemHash,
            socketType: socketType[socket.socketTypeHash]
         }
      })
   }

   const investmentStats = () => {
      return item.investmentStats?.flatMap((stat) => {
         const statHash = stat.statTypeHash
         if (statBlacklist.includes(statHash)) return []
         return {
            isConditionallyActive: stat.isConditionallyActive,
            statTypeHash: statHash,
            value: stat.value
         }
      })
   }

   const getClass = () => {
      const classes: { [key: string]: string } = {
         21: 'Warlock',
         22: 'Titan',
         23: 'Hunter'
      }
      return item.itemCategoryHashes?.find((categoryHash) => classes[categoryHash])
   }

   const getDamageType = () => {
      if (!item.defaultDamageTypeHash) return undefined
      const dmgTypeInfo = damageType[item.defaultDamageTypeHash]
      return {
         blankIcon: dmgTypeInfo.transparentIconPath ? `https://www.bungie.net${dmgTypeInfo.transparentIconPath}` : undefined,
         description: dmgTypeInfo.displayProperties.description,
         icon: dmgTypeInfo.displayProperties.icon ? `https://www.bungie.net${dmgTypeInfo.displayProperties.icon}` : undefined,
         name: dmgTypeInfo.displayProperties.name
      }
   }

   const getBreakerType = () => {
      if (!item.breakerTypeHash) return undefined
      const breakerTypeInfo = breakerType[item.breakerTypeHash]
      return {
         description: breakerTypeInfo.displayProperties.description,
         icon: breakerTypeInfo.displayProperties.icon ? `https://www.bungie.net${breakerTypeInfo.displayProperties.icon}` : undefined,
         name: breakerTypeInfo.displayProperties.name
      }
   }

   const requiredClass = getClass()

   // const itemClassName =
   //    item.itemType === 3
   //       ? `${requiredClass} ${item.itemTypeDisplayName?.replace(/Warlock|Titan|Hunter/, '').trim()}` // Warlock Helmet, Warlock Bond, Titan Mark, etc...
   //       : item.itemTypeDisplayName // Shotgun, Sniper Rifle, Combat Bow, etc...

   return {
      ammo: getAmmoType(),
      breakerType: getBreakerType(),

      class: requiredClass,

      collectibleHash: item.collectibleHash,

      defaultDamageType: getDamageType(),

      displayProperties: {
         icon: item.displayProperties.icon ? `https://www.bungie.net${item.displayProperties.icon}` : undefined,
         name: item.displayProperties.name
      },
      // Shotgun, Sniper Rifle, Combat Bow, etc...
      flavorText: item.flavorText,
      hash: item.hash,
      iconWatermark: item.iconWatermark ? `https://www.bungie.net${item.iconWatermark}` : undefined,
      inventory: {
         bucketType: inventoryBucket[item.inventory.bucketTypeHash].displayProperties.name,
         tierTypeName: item.inventory.tierTypeName
      },
      investmentStats: investmentStats(),
      isAdept: !!item.displayProperties.name.match(/(?! \((Damaged|Baroque)\)$)( \(.*.\)$)/i),
      itemClassTypeName: item.itemTypeDisplayName,
      itemType: item.itemType === 3 ? 'weapon' : 'armor',
      loreHash: item.loreHash,
      screenshot: item.screenshot ? `https://www.bungie.net${item.screenshot}` : undefined,
      sockets: sockets(),
      stats: {
         statGroupHash: item.stats?.statGroupHash,
         stats: item.stats ? stats(item.stats.stats) : []
      },
      wishlist: []
   } as InventoryItem // types are changed and conflict with each other
}
