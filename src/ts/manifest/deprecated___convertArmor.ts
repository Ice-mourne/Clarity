// import { B_SocketType_PlugWhitelist, BungieInvItemSocketEntry, BungieInventoryItem, BungieManifest } from '@interfaces/ts/manifest/bungieManifest'

// import { InventoryItem } from '@interfaces/ts/manifest/clarityManifest'

// export function convertArmor(itemArmor: B_InventoryItem, manifest: B_Manifest) {
//    const item = itemArmor
//    const inventoryBucket = manifest.DestinyInventoryBucketDefinition
//    const socketType = manifest.DestinySocketTypeDefinition
//    const socketCategory = manifest.DestinySocketCategoryDefinition

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

//    const sockets = () => {
//       const socketName = (bungieSocketName: string, socket: B_InvItem_SocketEntry) => {
//          if (bungieSocketName === 'ARMOR PERKS') {
//             return socket.defaultVisible ? 'perk' : 'stat'
//          }

//          if (bungieSocketName === 'ARMOR COSMETICS') {
//             const isShader = socketType[socket.socketTypeHash].plugWhitelist?.some(
//                (plug: B_SocketType_PlugWhitelist) => plug.categoryIdentifier === 'shader'
//             )
//             return isShader ? 'shader' : 'ornament'
//          }

//          if (bungieSocketName === 'ARMOR MODS') {
//             return 'mod'
//          }

//          if (bungieSocketName === 'ARMOR TIER') {
//             return 'energyType'
//          }
//          return 'unknown look what it is and add it'
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

//    const stats = () => {
//       return item.investmentStats?.flatMap((stat) => {
//          const statHash = stat.statTypeHash
//          const blacklisted = [3897883278, 1935470627, 1885944937] // Defence, Power, undefined
//          if (blacklisted.includes(statHash)) return []
//          return {
//             statTypeHash: statHash,
//             value: stat.value
//          }
//       })
//    }
//    const requiredClass = getClass()

//    return {
//       displayProperties: {
//          name: item.displayProperties.name,
//          icon: `https://www.bungie.net${item.displayProperties.icon}`
//       },
//       collectibleHash: item.collectibleHash,
//       iconWatermark: item.iconWatermark,
//       screenshot: item.screenshot,
//       itemClassTypeName: `${requiredClass} ${item.itemTypeDisplayName?.replace(/Warlock|Titan|Hunter/, '').trim()}`, // Warlock Helmet, Warlock Bond, Titan Mark, etc...
//       flavorText: item.flavorText,
//       inventory: {
//          bucketType: inventoryBucket[item.inventory.bucketTypeHash].displayProperties.name,
//          tierTypeName: item.inventory.tierTypeName
//       },
//       sockets: sockets(),
//       investmentStats: stats(),
//       loreHash: item.loreHash,
//       hash: item.hash,
//       itemType: 'armor',
//       class: requiredClass
//    } as InventoryItem // types are changed and conflict with each other
// }

export const deprecated1 = ''
