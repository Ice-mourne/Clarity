import { InventoryItem, PlugSet } from '@interfaces/ts/manifest/clarityManifest'

import { BungieManifest } from '@interfaces/ts/manifest/bungieManifest'

export function getPlugSet(
   manifest: BungieManifest,
   items: { [key: string]: InventoryItem }
): { [key: string]: PlugSet[] } {
   const plugSet = manifest.DestinyPlugSetDefinition
   const MaterialRequirementSet = manifest.DestinyMaterialRequirementSetDefinition

   const plugSetHashes = new Set<number>()
   for (const i in items) {
      items[i].sockets.forEach((socket) => {
         if (socket.randomizedPlugSetHash) plugSetHashes.add(socket.randomizedPlugSetHash)
         if (socket.reusablePlugSetHash) plugSetHashes.add(socket.reusablePlugSetHash)
      })
   }

   const plugSetItems: { [key: string]: PlugSet[] } = {}
   for (const i of plugSetHashes) {
      const reusablePlugItems = plugSet[i].reusablePlugItems
      if (!reusablePlugItems) continue

      plugSetItems[i] = reusablePlugItems.map((plug) => {
         const getCraftingRequirements = () => {
            const materialHash = plug.craftingRequirements?.materialRequirementHashes?.[0]
            if (!materialHash) return undefined

            return {
               level: plug.craftingRequirements?.requiredLevel,
               materials: MaterialRequirementSet[materialHash].materials?.map((material) => {
                  return {
                     hash: material.itemHash,
                     quantity: material.count
                  }
               })
            }
         }

         return {
            crafting: getCraftingRequirements(),
            plugItemHash: plug.plugItemHash
         }
      })
   }
   return plugSetItems
}
