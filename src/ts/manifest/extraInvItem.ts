import { BungieInventoryItem, BungieManifest } from '@interfaces/ts/manifest/bungieManifest'

export function extraInvItem(item: BungieInventoryItem, manifest: BungieManifest) {
   const getObjectiveNames = (objectiveArr: number[] | undefined) => {
      if (!objectiveArr) return

      return objectiveArr.reduce(
         (cur, objective) => {
            cur[objective] = {
               hash: objective,
               name: manifest.DestinyObjectiveDefinition[objective].progressDescription
            }
            return cur
         },
         {} as {
            [key: string]: {
               hash: number
               name: string
            }
         }
      )
   }

   if (item.displayProperties.name.match(/Crucible Tracker|Kill Tracker|Deepsight Resonance|Shaped Weapon/i)) {
      return {
         displayProperties: {
            icon: item.displayProperties.icon,
            name: item.displayProperties.name
         },
         hash: item.hash,
         itemType: item.displayProperties.name.match(/Tracker/i) ? 'tracker' : 'deepsight',
         objectives: getObjectiveNames(item.objectives?.objectiveHashes)
      }
   }
}
