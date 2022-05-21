import { ClarityData, UsersInventorySockets } from '@interfaces/ts/userData/clarityUser'
import { ClarityManifest, InventoryItem } from '@interfaces/ts/manifest/clarityManifest'

export function calculateStats (context: ClarityData) {
   const manifest = context.manifest
   const staticItem = context.clickedItem?.static?.item
   const uniqueItem = context.clickedItem?.unique
   const statGroupHash = context.clickedItem?.static?.item?.stats?.statGroupHash

   if (!statGroupHash || !staticItem || !uniqueItem) return
   const scaledStats = manifest.statGroup[statGroupHash].scaledStats

   const invStats = calculateInvStats(staticItem, uniqueItem?.sockets, manifest)
   if (!invStats) return

   const stats = scaledStats.reduce((acc, stat) => {
      const rawInvStat = invStats[stat.statHash]
      // if (rawInvStat === undefined) return acc
      const invStat = Math.min(Math.max(rawInvStat, 0), 100)

      const endIndex = stat.displayInterpolation.findIndex((x) => x.value >= invStat)

      const start = endIndex === 0 ? stat.displayInterpolation[0] : stat.displayInterpolation[endIndex - 1]
      const end = endIndex <= 1 ? stat.displayInterpolation[1] : stat.displayInterpolation[endIndex]

      const t = Math.max((invStat - start.value) / (end.value - start.value), 0)

      /**
       ** Check if number ends with 0.5
       ** If yes round down otherwise round
      */
      function simpleRound (stat: number) {
         return stat % 1 === 0.5 ? Math.floor(stat) : Math.round(stat)
      }

      acc[stat.statHash] = simpleRound(start.weight + t * (end.weight - start.weight))

      return acc
   }, invStats)

   const namedStats = Object.entries(stats).reduce((acc, [statHash, value]) => {
      const name = manifest.statNames[statHash].name

      acc[name || statHash] = value

      return acc
   }, {} as { [key: string]: number })

   return namedStats
}

function calculateInvStats (staticItem: InventoryItem, sockets: UsersInventorySockets, manifest: ClarityManifest) {
   const itemInvStats = staticItem.investmentStats?.reduce((acc, stat) => {
      acc[stat.statTypeHash] = acc[stat.statTypeHash] + stat.value || stat.value
      return acc
   }, {} as { [key: string]: number })

   if (!itemInvStats) return

   return sockets.active.reduce((acc, perk) => {
      const perkHash = perk.plugHash
      if (!perkHash) return acc
      const manifestPerk = manifest.perksAndStuff[perkHash]
      const perkInvStats = manifest.perksAndStuff[perkHash]?.investmentStats
      if (!perkInvStats) return acc

      perkInvStats.forEach((stat) => {
         if (
            stat.isConditionallyActive &&
            (staticItem.isAdept || staticItem.inventory.tierTypeName === 'Exotic') &&
            (manifestPerk.itemType?.match(/masterwork|catalyst/) ||
               manifestPerk.itemTypeDisplayName === 'Enhanced Intrinsic')
         ) { return }

         // doing like this will avoid NaN because nothing + number would be NaN
         acc[stat.statTypeHash] = acc[stat.statTypeHash] + stat.value || stat.value
      })

      return acc
   }, itemInvStats)
}
