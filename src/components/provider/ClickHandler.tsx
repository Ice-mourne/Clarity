import { ProviderContext, SetProviderContext } from './DataProvider_old'
import { useCallback, useContext, useEffect, useState } from 'react'

import { ClarityData } from '@interfaces/ts/userData/clarityUser'

function clickEventListener_DIM(handler: Function) {
   useEffect(() => {
      const listener = (e: MouseEvent | TouchEvent) => {
         // just to ignore events clarity is sending to DIM
         if (!e.isTrusted) return
         handler(e.composedPath())
      }

      const DIM = document.querySelector('#app') as HTMLElement

      DIM.addEventListener('click', listener)
      DIM.addEventListener('touchstart', listener)

      return () => {
         DIM.removeEventListener('click', listener)
         DIM.removeEventListener('touchstart', listener)
      }
   }, [handler])
}

function filterClickEvent(path: Array<HTMLElement> | null, context: ClarityData) {
   if (!path) return
   // check if user clicked on item we have information about
   // if it is return that item with raw info about it
   const itemElement = path.find((element, index) => (element.className === 'item' && element.id) || index >= 4)

   const { items } = context.manifest
   const inventoryItem = context.usersInventory?.[itemElement?.id || 0]

   if (itemElement?.id && inventoryItem) {
      return {
         HTMLElement: itemElement,

         static: {
            hash: inventoryItem.hash,
            item: items[inventoryItem.hash]
         },

         unique: {
            id: inventoryItem.itemInstanceId,
            sockets: inventoryItem.sockets,
            powerLvl: inventoryItem.powerLvl,
            state: inventoryItem.state,
            note: inventoryItem.note,
            progress: inventoryItem.progress
         }
      }
   }

   return undefined
}

export default function ClickHandler() {
   const setContext = useContext(SetProviderContext)
   const context = useContext(ProviderContext)

   const [eventPath, setEvent] = useState(null as Array<HTMLElement> | null)

   const clickCallback = useCallback(
      (ePath: Array<HTMLElement>) => {
         setEvent(ePath)
      },
      []
   )
   clickEventListener_DIM(clickCallback)

   useEffect(() => {
      setContext((data) => ({
         ...data,
         clickedItem: filterClickEvent(eventPath, context)
      }))
   }, [eventPath])

   return null
}


