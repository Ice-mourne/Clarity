export interface UserProfileDIM {
   itemHashTags: {
      [key: string]: {
         hash: number
      }
   },
   profiles: {
      [key: string]: {
         loadouts: {
            [key: string]: {
               classType: number,
               clearSpace: boolean,
               createdAt: Date,
               equipped: Array<{
                  amount: number,
                  hash: number
                  id: string
               }>,
               id: string,
               lastUpdatedAt: Date,
               name: string,
               unequipped: any[]
            }
         }
         tags: {
            [key: string]: {
               id: string
               notes?: string,
               tag?: string
            }
         }
         triumphs: number[]
      }
   }
   searches: {
      [key: string]: Array<{
         lastUsage: number,
         query: string,
         saved: boolean
         usageCount: number
      }>
   },
   settings: {
      charCol: string,
      characterOrder: string
      collapsedSections: { [key: string]: boolean },
      compareBaseStats: boolean,
      customCharacterSort: string[],
      customTotalStatsByClass: { [key: string]: number[] },
      itemQuality: boolean,
      itemSize: string,
      itemSortOrderCustom: string[],
      loParameters: {
         assumeArmorMasterwork: number,
         statConstraints: Array<{
            statHash: number
         }>
      },
      organizerColumnsArmor: string[]
      organizerColumnsWeapons: string[],
      singleCharacter: boolean
   },
   updateQueue: any[]
}
