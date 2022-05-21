import { ClarityAuth, ClarityData, ClarityUser } from '@interfaces/ts/userData/clarityUser'
import { useEffect, useState } from 'react'

import React from 'react'
import { getManifest } from '@ts/manifest/getManifest'
import { getUserInventory } from '@ts/userData/getUserData'

function checkUserInfo() {
   const authString = localStorage.getItem('clarityAuthorization')
   const userString = localStorage.getItem('clarityUser')

   const auth: ClarityAuth | null = authString ? JSON.parse(authString) : null
   const user: ClarityUser[] | null = userString ? JSON.parse(userString) : null

   // if data in not found return null and get ask for auth
   if (!auth || !user) return null
   return {
      auth,
      user
   }
}

export const ProviderContext = React.createContext({} as ClarityData)
export const SetProviderContext = React.createContext({} as React.Dispatch<React.SetStateAction<ClarityData>>)

export function DataProvider_({ children }: { children: JSX.Element }) {
   const [clarityData, setClarityData] = useState({
      authState: {
         askForAuth: false,
         platformSelection: false,
         getUserData: false,
         haveUserData: true
      }
   } as ClarityData)

   // get manifest
   useEffect(() => {
      getManifest().then((manifest) => {
         setClarityData((data) => ({
            ...data,
            manifest
         }))
      })
   }, [])

   // get user and auth
   useEffect(() => {
      const userAndAuth = checkUserInfo()
      // if user and auth are not present ask for auth
      if (!userAndAuth) {
         setClarityData((data) => ({
            ...data,
            authState: {
               ...data.authState,
               askForAuth: true,
               haveUserData: false
            }
         }))
         return
      }

      // if user and auth are present set data
      setClarityData((data) => ({
         ...data,
         authInfo: userAndAuth
      }))
   }, [])

   // get users inventory
   // start this the manifest, user, and auth are all present
   useEffect(() => {
      if (!(clarityData.manifest && clarityData.authInfo?.auth && clarityData.authInfo?.user)) return

      getUserInventory(clarityData.manifest).then((usersInventory) => {
         setClarityData((data) => ({
            ...data,
            usersInventory,
            authState: {
               ...data.authState,
               haveUserData: true
            }
         }))
         console.log(`🍑 Users Data updated 🍑`)
      })
   }, [clarityData.manifest, clarityData.authInfo?.auth, clarityData.authInfo?.user])

   return (
      <ProviderContext.Provider value={clarityData}>
         <SetProviderContext.Provider value={setClarityData}>{children}</SetProviderContext.Provider>
      </ProviderContext.Provider>
   )
}
