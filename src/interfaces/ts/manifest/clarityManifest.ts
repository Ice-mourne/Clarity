export interface ClarityManifest {
   items: { [key: string]: InventoryItem }
   perksAndStuff: { [key: string]: PerksAndStuff }
   plugSet: { [key: string]: PlugSet[] }
   statGroup: { [key: string]: StatGroup }
   statNames: { [key: string]: StatNames }
}

export interface InventoryItem {
   ammo: {
      icon: string,
      name: string
   },
   breakerType?: {
      description: string,
      icon: string,
      name: string
   },
   class?: 'Hunter' | 'Titan' | 'Warlock',
   collectibleHash: number,
   defaultDamageType: {
      blankIcon: string,
      description: string
      icon: string
      name: string
   },
   displayProperties: {
      icon: string,
      name: string
   },
   flavorText: string,
   hash: number,
   iconWatermark?: string,
   inventory: {
      bucketType: string,
      tierTypeName: 'Exotic' | 'Legendary'
   },
   investmentStats?: Array<{
      isConditionallyActive: boolean,
      statTypeHash: number,
      value: number
   }>
   isAdept: boolean,
   /**
    ** Auto Rifle, Shotgun, Rocket Launcher, ect...
    ** Warlock Helmet, Warlock Bond, Titan Mark, etc...
    */
   itemClassTypeName: string,
   itemType: 'weapon' | 'armor',
   loreHash?: number,
   screenshot: string,
   sockets: Array<{
      randomizedPlugSetHash?: number,
      reusablePlugItems?: number[],
      reusablePlugSetHash?: number
      singleInitialItemHash: number,
      socketType?: string
   }>,
   stats: {
      statGroupHash: number
      stats: Array<{
         statHash: number
         value: number
      }>
   },
   wishlist?: any
}

export interface PlugSet {
   crafting?: {
      level?: number,
      materials: Array<{
         hash: number
         quantity: number
      }>
   },
   plugItemHash: number
}

export type SocketTypeNames =
| 'weaponPerks'
| 'intrinsics'
| 'origins'
| 'trackers'
| 'catalysts'
| 'masterworks'
| 'mods'
| 'cosmetics'
| 'mementos'
| 'shaders'
| 'craftingMaterials'
| 'no_clue'
| 'deprecated'

export interface PerksAndStuff {
   displayProperties: {
      description?: string,
      icon: string,
      name?: string
   }
   hash?: number,
   iconWatermark?: string,
   investmentStats?: Array<{
      isConditionallyActive: boolean,
      statTypeHash: number,
      value: number
   }>,
   itemType: SocketTypeNames,
   itemTypeDisplayName?: string
   objectives?: {
      [key: string]: {
         hash: number
         name: string
      }
   },
   screenshot?: string,
   source?: string
}

export interface StatGroup {
   hash: number
   scaledStats: Array<{
      displayInterpolation: Array<{
         value: number
         weight: number
      }>,
      statHash: number
   }>
}

export interface StatNames {
   description?: string,
   hash: number,
   name?: string
}
