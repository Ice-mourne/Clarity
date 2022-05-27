import { Updater, useImmer } from 'use-immer'
import { createContext, useEffect } from 'react'

import { ClarityData } from '../interfaces/globalData.interface'
import locationFinder from '@hooks/locationFinder'
import { saveSettings } from '@hooks/settings'

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
      locations: JSON.parse(localStorage.getItem('claritySettings') || '{}')?.locations || {},
      dimVersion: JSON.parse(localStorage.getItem('claritySettings') || '{}')?.dimVersion || 'DIM v0.0.0',
      disableTheme: false
   } as ClarityData)

   useEffect(() => {
      locationFinder(setClarityData)
   }, [])

   useEffect(() => {
      saveSettings({ clarityData })
   }, [clarityData.locations, clarityData.dimVersion])

   return (
      <ClarityDataContext.Provider value={clarityData}>
         <SetClarityDataContext.Provider value={setClarityData}>{children}</SetClarityDataContext.Provider>
      </ClarityDataContext.Provider>
   )
}
