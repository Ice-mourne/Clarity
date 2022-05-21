import { BungieManifest } from '@interfaces/ts/manifest/bungieManifest'
import { StatGroup } from '@interfaces/ts/manifest/clarityManifest'

export function getStatGroup (manifest: BungieManifest) {
   return Object.entries(manifest.DestinyStatGroupDefinition).reduce((acc, [key, value]) => {
      if (value.scaledStats.length === 0) return acc

      // not sure if these are used at all probably no
      if (value.maximumValue !== 100) return acc

      acc[key] = {
         hash: value.hash,
         scaledStats: value.scaledStats.map((stat) => {
            return {
               displayInterpolation: stat.displayInterpolation,
               statHash: stat.statHash
            }
         })
      }

      return acc
   }, {} as { [key: string]: StatGroup })
}
