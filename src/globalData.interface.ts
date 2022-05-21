export interface ClarityData {
   authState: {
      askForAuth: boolean
      getUserData: boolean
      haveUserData: boolean
      platformSelection: boolean
   }
   menuState:  boolean
   dimVersion: string
   disableTheme: boolean
   locations: {
      backgroundColor: string[]
      dimMenu: string
      header: string
      inventoryItems: {
         all: {
            border: string
            bottom: string
            watermark: string
            invisibleBorder: string
         }
         consumable: {
            atCapacity: {
               bottom: string
               commonBorder: string
               rareBorder: string
               legendaryBorder: string
               exoticBorder: string
            }
            maxStackSize: {
               bottom: string
            }
         }
         deepsight: {
            border: string
            borderImg: string
            bottom: string
         }
         masterwork: {
            border: string
            bottom: string
            borderImg: string
            exoticBorderImg: string
         }
         tags: {
            archive: string
            favorite: string
            infuse: string
            junk: string
            keep: string
            lock: string
            note: string
         }
         thumbsDown: string
         thumbsUp: string
      }
   }
   theme: {
      background: {
         centerColor: string
         centerColorSpread: number
         surroundingColor: string
         surroundingColorSpread: number
         centerColorVertical: number,
         centerColorHorizontal: number,
      }
      inventoryItems: {
         all: {
            border: string
            bottom: string
            powerLevel: string
         }
         consumable: {
            atCapacity: {
               bottom: string
               numberOfItems: string
               border: string
            }
            maxStackSize: {
               bottom: string
               numberOfItems: string
            }
         }
         deepsight: {
            border: string
            bottom: string
            powerLevel: string
         }
         masterwork: {
            border: string
            bottom: string
            powerLevel: string
         }
         tags: {
            archive: string
            favorite: string
            infuse: string
            junk: string
            keep: string
            lock: string
            note: string
         }
         thumbsDown: string
         thumbsUp: string
      }
   }
}
