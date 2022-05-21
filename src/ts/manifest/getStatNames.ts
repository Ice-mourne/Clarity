import { BungieManifest } from '@interfaces/ts/manifest/bungieManifest'

export function getStatNames(manifest: BungieManifest) {
   const stats = manifest.DestinyStatDefinition

   return Object.entries(stats).reduce((acc, [key, value]) => {
      acc[key] = {
         description: value.displayProperties.description,
         hash: value.hash,
         name: value.displayProperties.name
      }
      return acc
   }, {} as { [key: string]: any })
}
