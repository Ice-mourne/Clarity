// @blocksort
export interface ClarityData {
   authState: {
      askForAuth: boolean
      getUserData: boolean
      haveUserData: boolean
      platformSelection: boolean
   }
   dimVersion: string
   disableTheme: boolean
   locations: {
      backgroundColor: string[]
      dimMenu: string
      header: string
      inventoryItems: {
         all: {
            bottom: string
            img: string
            imgWithInvisibleBorder: string
            watermark: string
         }
         consumable: {
            capped: {
               bottom: string
               commonItemImg: string
               exoticItemImg: string
               legendaryItemImg: string
               rareItemImg: string
            }
            fullStack: {
               bottom: string
            }
         }
         deepsight: {
            bottom: string
            img: string
            imgBorderImg: string
         }
         masterwork: {
            bottom: string
            img: string
            imgBorderImg: string
            imgBorderImgExotic: string
         }
      }
   }
   menuState: boolean
}
// @blocksort
export interface Theme {
   background: {
      backgroundColor: [string, boolean]
      circleColor: [string, boolean]
      circlePositionHorizontal: [number, boolean]
      circlePositionVertical: [number, boolean]
      circleSize: [number, boolean]
      circleSpread: [number, boolean]
   }
   inventoryItems: {
      all: {
         border: [string, boolean]
         bottomBackground: [string, boolean]
         powerLevel: [string, boolean]
         borderType: 'fullBorder' | 'minimalBorder' | 'noBorder'
      }
      consumable: {
         capped: {
            border: [string, boolean]
            bottomBackground: [string, boolean]
            numberOfItems: [string, boolean]
            borderType: 'fullBorder' | 'minimalBorder' | 'noBorder'
         }
         fullStack: {
            bottomBackground: [string, boolean]
            numberOfItems: [string, boolean]
         }
      }
      deepsight: {
         border: [string, boolean]
         bottomBackground: [string, boolean]
         powerLevel: [string, boolean]
         borderType: 'fullBorder' | 'minimalBorder' | 'noBorder'
      }
      masterwork: {
         border: [string, boolean]
         bottomBackground: [string, boolean]
         powerLevel: [string, boolean]
         borderType: 'fullBorder' | 'minimalBorder' | 'noBorder'
      }
      tags: {
         archive: [string, boolean]
         favorite: [string, boolean]
         infuse: [string, boolean]
         junk: [string, boolean]
         keep: [string, boolean]
         lock: [string, boolean]
         note: [string, boolean]
      }
      thumbsDown: [string, boolean]
      thumbsUp: [string, boolean]
   }
}

// @blocksort
export interface Themes {
   'Clarity default': Theme
   'DIM default': Theme
   selectedTheme: string
   userThemes: { [key: string]: Theme }
}







