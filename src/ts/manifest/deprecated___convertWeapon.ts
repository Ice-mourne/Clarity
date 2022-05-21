// import {
//    B_SocketType_PlugWhitelist,
//    BungieInvItemSocketEntry,
//    BungieInventoryItem,
//    BungieInventoryItemStat,
//    BungieManifest
// } from '@interfaces/ts/manifest/bungieManifest'

// import { InventoryItem } from '@interfaces/ts/manifest/clarityManifest'
// import heavyAmmo from '@assets/ammoSVG/heavy.svg'
// import primaryAmmo from '@assets/ammoSVG/primary.svg'
// import specialAmmo from '@assets/ammoSVG/special.svg'

// export function convertWeapon(itemWeapon: B_InventoryItem, manifest: B_Manifest) {
//    const item = itemWeapon
//    const inventoryBucket = manifest.DestinyInventoryBucketDefinition
//    const socketType = manifest.DestinySocketTypeDefinition
//    const socketCategory = manifest.DestinySocketCategoryDefinition
//    const damageType = manifest.DestinyDamageTypeDefinition
//    const breakerType = manifest.DestinyBreakerTypeDefinition

//    const stats = (stats: { [key: string]: B_InventoryItem_Stat }) =>
//       Object.values(stats).flatMap((stat) => {
//          if (stat.statHash.toString().match(/1480404414|1885944937|1935470627/)) return [] // remove pointless stats
//          return {
//             statHash: stat.statHash,
//             value: stat.value
//          }
//       })

//    const getAmmoType = () => {
//       if (!item.equippingBlock?.ammoType) return undefined
//       // browser can use decoded svg but it will fuck up colors
//       const decodeSVG = (svg: string) => `data:image/svg+xml,${atob(svg.replace('data:image/svg+xml;base64,', ''))}`

//       switch (item.equippingBlock.ammoType) {
//          case 1:
//             return {
//                name: 'Primary',
//                icon: decodeSVG(primaryAmmo)
//             }
//          case 2:
//             return {
//                name: 'Special',
//                icon: decodeSVG(specialAmmo)
//             }
//          case 3:
//             return {
//                name: 'Heavy',
//                icon: decodeSVG(heavyAmmo)
//             }
//          default:
//             return undefined
//       }
//    }

//    const sockets = () => {
//       const socketName = (bungieSocketName: string, socket: B_InvItem_SocketEntry) => {
//          const matchPlugCategory = (lookFor: string) =>
//             socketType[socket.socketTypeHash].plugWhitelist?.some((plug: B_SocketType_PlugWhitelist) =>
//                plug.categoryIdentifier.match(new RegExp(lookFor))
//             )

//          if (bungieSocketName === 'INTRINSIC TRAITS') {
//             return 'frame'
//          }

//          if (bungieSocketName === 'WEAPON PERKS') {
//             if (socket.reusablePlugSetHash === 1454) return 'tracker'
//             const isCatalyst = matchPlugCategory('exotic.masterwork')
//             const isTracker = matchPlugCategory('masterworks.trackers')
//             const isOrigins = matchPlugCategory('origins')
//             return isCatalyst ? 'catalyst' : isTracker ? 'tracker' : isOrigins ? 'origin' : 'perk'
//          }

//          if (bungieSocketName === 'WEAPON COSMETICS') {
//             const isShader = matchPlugCategory('^shader$')
//             return isShader ? 'shader' : 'ornament'
//          }

//          if (bungieSocketName === 'WEAPON MODS') {
//             const isMod = matchPlugCategory('weapon.mod_empty')
//             const isMasterwork = matchPlugCategory('weapons.masterworks|[_.]masterwork')
//             const isCraftingMaterials = matchPlugCategory('weapons.mods.memories')
//             const isCatalyst = matchPlugCategory('exotic_weapon_masterwork_upgrade')
//             return isMod
//                ? 'mod'
//                : isMasterwork
//                ? 'masterwork'
//                : isCraftingMaterials
//                ? 'craftingMaterials'
//                : isCatalyst
//                ? 'catalyst'
//                : undefined
//          }

//          const isMomento = matchPlugCategory('^mementos$')
//          return isMomento ? 'memento' : undefined
//       }

//       return item.sockets?.socketEntries.flatMap((socket) => {
//          if (socket.socketTypeHash === 0) return []
//          const socketCategoryHash = socketType[socket.socketTypeHash].socketCategoryHash
//          const bungieSocketName = socketCategory[socketCategoryHash].displayProperties.name

//          return {
//             socketType: socketName(bungieSocketName, socket),
//             singleInitialItemHash: socket.singleInitialItemHash,
//             reusablePlugItems: socket.reusablePlugItems.map((item) => item.plugItemHash),
//             reusablePlugSetHash: socket.reusablePlugSetHash,
//             randomizedPlugSetHash: socket.randomizedPlugSetHash
//          }
//       })
//    }

//    const investmentStats = () => {
//       return item.investmentStats?.flatMap((stat) => {
//          const statHash = stat.statTypeHash
//          const blacklisted = [1480404414, 1935470627, 1885944937] // Attack, Power, undefined
//          if (blacklisted.includes(statHash)) return []
//          return {
//             statTypeHash: statHash,
//             value: stat.value,
//             isConditionallyActive: stat.isConditionallyActive
//          }
//       })
//    }

//    const getClass = () => {
//       const classIndex = item.itemCategoryHashes?.find((categoryHash) => {
//          return categoryHash >= 21 && categoryHash <= 23
//       }) as 21 | 22 | 23
//       const classes = {
//          21: 'Warlock',
//          22: 'Titan',
//          23: 'Hunter'
//       } as const
//       return classes[classIndex]
//    }

//    const getDamageType = () => {
//       if (!item.defaultDamageTypeHash) return undefined
//       const dmgTypeInfo = damageType[item.defaultDamageTypeHash]
//       return {
//          name: dmgTypeInfo.displayProperties.name,
//          description: dmgTypeInfo.displayProperties.description,
//          icon: `https://www.bungie.net${dmgTypeInfo.displayProperties.icon}`,
//          blankIcon: dmgTypeInfo.transparentIconPath
//       }
//    }

//    const getBreakerType = () => {
//       if (!item.breakerTypeHash) return undefined
//       const breakerTypeInfo = breakerType[item.breakerTypeHash]
//       return {
//          name: breakerTypeInfo.displayProperties.name,
//          description: breakerTypeInfo.displayProperties.description,
//          icon: `https://www.bungie.net${breakerTypeInfo.displayProperties.icon}`
//       }
//    }

//    return {
//       displayProperties: {
//          name: item.displayProperties.name,
//          icon: `https://www.bungie.net${item.displayProperties.icon}`
//       },
//       collectibleHash: item.collectibleHash,
//       iconWatermark: item.iconWatermark,
//       screenshot: item.screenshot,
//       itemClassTypeName: item.itemTypeDisplayName, // Shotgun, Sniper Rifle, Combat Bow, etc...
//       flavorText: item.flavorText,
//       inventory: {
//          bucketType: inventoryBucket[item.inventory.bucketTypeHash].displayProperties.name as
//             | 'Energy Weapons'
//             | 'Kinetic Weapons'
//             | 'Power Weapons',
//          tierTypeName: item.inventory.tierTypeName as 'Legendary' | 'Exotic'
//       },
//       stats: {
//          statGroupHash: item.stats?.statGroupHash,
//          stats: item.stats ? stats(item.stats.stats) : []
//       },
//       ammo: getAmmoType(),
//       sockets: sockets(),
//       investmentStats: investmentStats(),
//       loreHash: item.loreHash,
//       breakerType: getBreakerType(),
//       defaultDamageType: getDamageType(),
//       hash: item.hash,
//       itemType: 'weapon',
//       isAdept: item.displayProperties.name.match(/(?! \((Damaged|Baroque)\)$)( \(.*.\)$)/i) ? true : false,
//       class: getClass(),
//       wishlist: []
//    } as InventoryItem // types are changed and conflict with each other
// }
export const deprecated2 = ''
