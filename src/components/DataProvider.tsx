import { Updater, useImmer } from 'use-immer'
import { createContext, useEffect } from 'react'
import { loadSettings, saveSettings } from '@hooks/settings'

import { ClarityData } from '../globalData.interface'
import locationFinder from '@hooks/locationFinder'

export const ClarityDataContext = createContext({} as ClarityData)
export const SetClarityDataContext = createContext({} as Updater<ClarityData>)
export const DataProvider = ({ children }: { children: JSX.Element }) => {
   const [clarityData, setClarityData] = useImmer({
      authState: {
         askForAuth: false,
         platformSelection: false,
         getUserData: false,
         haveUserData: true
      },
      menuState: false,
      locations: {},
      dimVersion: 'DIM v0.0.0',
      disableTheme: false,
      theme: {
         background: {
            centerColor: '#393956',
            centerColorSpread: 0,
            surroundingColor: '#161627',
            surroundingColorSpread: 100,
            centerColorVertical: 5,
            centerColorHorizontal: 50
         },
         inventoryItems: {
            all: {
               border: '#ddd',
               bottom: '#ddd',
               powerLevel: '#000000'
            },
            consumable: {
               atCapacity: {
                  bottom: '#f5dc56',
                  numberOfItems: '#f2721b',
                  border: '#f5dc56'
               },
               maxStackSize: {
                  bottom: '#ddd',
                  numberOfItems: '#f2721b'
               }
            },
            deepsight: {
               border: '#d25336',
               bottom: '#ddd',
               powerLevel: '#000000'
            },
            masterwork: {
               border: '#eade8b',
               bottom: '#eade8b',
               powerLevel: '#000000'
            },
            tags: {
               archive: '#29f36a',
               favorite: '#29f36a',
               infuse: '#29f36a',
               junk: '#29f36a',
               keep: '#29f36a',
               lock: '#29f36a',
               note: '#29f36a'
            },
            thumbsDown: '',
            thumbsUp: '#0b486b'
         }
      }
   } as ClarityData)

   useEffect(() => {
      loadSettings(setClarityData)
      locationFinder(setClarityData)
   }, [])

   saveSettings(clarityData)

   return (
      <ClarityDataContext.Provider value={clarityData}>
         <SetClarityDataContext.Provider value={setClarityData}>{children}</SetClarityDataContext.Provider>
      </ClarityDataContext.Provider>
   )
}
