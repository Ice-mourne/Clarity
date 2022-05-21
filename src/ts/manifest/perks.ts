import { InventoryItem, PerksAndStuff, PlugSet } from '@interfaces/ts/manifest/clarityManifest'

import { BungieManifest } from '@interfaces/ts/manifest/bungieManifest'

export function getPerksAndShit (
   bungieManifest: BungieManifest,
   plugSet: { [key: string]: Array<PlugSet> },
   items: { [key: string]: InventoryItem }
) {
   const perkAndStuffHashes = Object.values(items).reduce((acc, item) => {
      item.sockets.forEach((socket) => {
         const socketType = socket.socketType
         acc[socket.singleInitialItemHash] = socketType

         if (socket.reusablePlugItems) {
            socket.reusablePlugItems.forEach((perkHash) => {
               acc[perkHash] = socketType
            })
         }

         if (socket.reusablePlugSetHash) {
            plugSet[socket.reusablePlugSetHash].forEach((plug) => {
               acc[plug.plugItemHash] = socketType
            })
         }

         if (socket.randomizedPlugSetHash) {
            plugSet[socket.randomizedPlugSetHash].forEach((plug) => {
               acc[plug.plugItemHash] = socketType
            })
         }
      })
      return acc
   }, {} as { [key: string]: string | undefined })

   const perksAndStuff = Object.entries(perkAndStuffHashes).reduce((acc, [itemHash, socketType]) => {
      if (!socketType) return acc
      if (itemHash === '0' || itemHash === 'null' || itemHash === 'undefined') return acc

      acc[itemHash] = getDataFromPerksAndStuff(bungieManifest, itemHash, socketType)

      return acc
   }, {} as { [key: string]: unknown })

   return perksAndStuff as { [key: string]: PerksAndStuff } // because of type conversion and my laziness
}

function getDataFromPerksAndStuff (manifest: BungieManifest, itemHash: string, socketType: string) {
   const item = manifest.DestinyInventoryItemDefinition[itemHash]
   const bungieCollectible = manifest.DestinyCollectibleDefinition
   return {
      displayProperties: {
         description: item.displayProperties.description,
         icon: item.displayProperties.icon ? `https://www.bungie.net${item.displayProperties.icon}` : undefined,
         name: item.displayProperties.name
      },
      iconWatermark: item.iconWatermark ? `https://www.bungie.net${item.iconWatermark}` : undefined,
      investmentStats: item.investmentStats,
      itemType: socketType,
      itemTypeDisplayName: item.itemTypeDisplayName,
      screenshot: item.screenshot ? `https://www.bungie.net${item.screenshot}` : undefined,
      source: item.collectibleHash ? bungieCollectible[item.collectibleHash]?.sourceString : undefined
   }
}
