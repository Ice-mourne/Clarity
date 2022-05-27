import { Theme, Themes } from '@interfaces/globalData.interface'
import { Updater, useImmer } from 'use-immer'
import { createContext, useEffect } from 'react'

import { saveSettings } from '@hooks/settings'

export const ThemeContext = createContext({} as Themes)
export const SetThemeContext = createContext({} as Updater<Themes>)

const clarityDefault: Theme = {
   background: {
      backgroundColor: ['#161627', true],
      circleColor: ['#393956', true],
      circlePositionHorizontal: [50, true],
      circlePositionVertical: [5, true],
      circleSize: [0, true],
      circleSpread: [100, true]
   },
   inventoryItems: {
      all: {
         bottomBackground: ['#ddd', true],
         borderType: 'noBorder',
         border: ['#ddd', true],
         powerLevel: ['#000000', true]
      },
      consumable: {
         capped: {
            bottomBackground: ['#f5dc56', true],
            borderType: 'noBorder',
            border: ['#f5dc56', true],
            numberOfItems: ['#f2721b', true]
         },
         fullStack: {
            bottomBackground: ['#ddd', true],
            numberOfItems: ['#f2721b', true]
         }
      },
      deepsight: {
         bottomBackground: ['#ddd', true],
         borderType: 'noBorder',
         border: ['#d25336', true],
         powerLevel: ['#000000', true]
      },
      masterwork: {
         bottomBackground: ['#eade8b', true],
         borderType: 'noBorder',
         border: ['#eade8b', true],
         powerLevel: ['#000000', true]
      },
      tags: {
         archive: ['#29f36a', true],
         favorite: ['#29f36a', true],
         infuse: ['#29f36a', true],
         junk: ['#29f36a', true],
         keep: ['#29f36a', true],
         lock: ['#29f36a', true],
         note: ['#29f36a', true]
      },
      thumbsDown: ['#d14334', true],
      thumbsUp: ['#0b486b', true]
   }
}
const dimDefault: Theme = {
   background: {
      backgroundColor: ['#161627', true],
      circleColor: ['#393956', true],
      circlePositionHorizontal: [50, true],
      circlePositionVertical: [5, true],
      circleSize: [0, true],
      circleSpread: [100, true]
   },
   inventoryItems: {
      all: {
         bottomBackground: ['#ddd', true],
         border: ['#ddd', true],
         borderType: 'fullBorder',
         powerLevel: ['#000000', true]
      },
      consumable: {
         capped: {
            bottomBackground: ['#f5dc56', true],
            border: ['#f5dc56', true],
            borderType: 'fullBorder',
            numberOfItems: ['#f2721b', true]
         },
         fullStack: {
            bottomBackground: ['#ddd', true],
            numberOfItems: ['#f2721b', true]
         }
      },
      deepsight: {
         bottomBackground: ['#ddd', true],
         border: ['#d25336', true],
         borderType: 'fullBorder',
         powerLevel: ['#000000', true]
      },
      masterwork: {
         bottomBackground: ['#eade8b', true],
         border: ['#eade8b', true],
         borderType: 'fullBorder',
         powerLevel: ['#000000', true]
      },
      tags: {
         archive: ['#29f36a', true],
         favorite: ['#29f36a', true],
         infuse: ['#29f36a', true],
         junk: ['#29f36a', true],
         keep: ['#29f36a', true],
         lock: ['#29f36a', true],
         note: ['#29f36a', true]
      },
      thumbsDown: ['#d14334', true],
      thumbsUp: ['#0b486b', true]
   }
}

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
   const [themes, setTheme]: [Themes, Updater<Themes>] = useImmer(
      // @blocksort
      JSON.parse(localStorage.getItem('claritySettings') || '{}')?.theme || {
         'Clarity default': clarityDefault,
         'DIM default': dimDefault,
         selectedTheme: 'DIM default',
         userThemes: {}
      }
   )
   useEffect(() => {
      saveSettings({ themes })
   }, [themes.selectedTheme, themes.userThemes])

   return (
      <ThemeContext.Provider value={themes}>
         <SetThemeContext.Provider value={setTheme}>{children}</SetThemeContext.Provider>
      </ThemeContext.Provider>
   )
}
