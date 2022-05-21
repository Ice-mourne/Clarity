import { BungieManifest, BungieManifestInfo } from '@interfaces/ts/manifest/bungieManifest'
import { getSettings, updateSettings } from '@tools/localStorage'

import { ClarityManifest } from '@interfaces/ts/manifest/clarityManifest'
import { convertBungieManifest } from './manifest'
import indexStorage from '@tools/indexedDB'
import { objectCleaner } from '@tools/objectCleaner'

export async function getManifest(): Promise<ClarityManifest> {
   async function getVersionLocation() {
      const resp = await fetch('https://www.bungie.net/Platform/Destiny2/Manifest/')
      const data = (await resp.json()) as BungieManifestInfo
      const version = data.Response.version
      const locations = data.Response.jsonWorldComponentContentPaths.en
      return { location: locations, version }
   }

   async function getBungieManifest(location: { [key: string]: string }): Promise<BungieManifest> {
      const locationList = [
         'DestinyBreakerTypeDefinition',
         'DestinyCollectibleDefinition',
         'DestinyDamageTypeDefinition',
         'DestinyInventoryBucketDefinition',
         'DestinyInventoryItemDefinition',
         'DestinyMaterialRequirementSetDefinition',
         'DestinyObjectiveDefinition',
         'DestinyPlugSetDefinition',
         'DestinyPowerCapDefinition',
         'DestinySocketCategoryDefinition',
         'DestinySocketTypeDefinition',
         'DestinyStatDefinition',
         'DestinyStatGroupDefinition'
      ]
      return locationList.reduce(async (acc, item) => {
         const data = await acc
         const resp = await fetch(`https://www.bungie.net${location[item]}`)
         const json = await resp.json()
         return { ...data, [item]: json }
      }, Promise.resolve({} as BungieManifest))
   }

   // compare saved manifest version with current version
   // if they are different get new manifest
   const { version, location } = await getVersionLocation()
   // check if DB has manifest
   const key = await indexStorage('clarity', 'check')
   if (version !== getSettings().manifestVersion || !key) {
      const bungieManifest = await getBungieManifest(location)
      const clarityManifest = convertBungieManifest(bungieManifest)

      const cleanManifest = objectCleaner(clarityManifest)
      indexStorage('clarity', 'put', cleanManifest)
      updateSettings('manifestVersion', version)

      console.log('🍕 Clarity Manifest updated 🍕')
      return cleanManifest
   }

   // if version is same get old manifest and return
   const manifest = (await indexStorage('clarity', 'get')) as ClarityManifest
   console.log('🍕 Clarity Manifest loaded 🍕')

   return manifest
}
