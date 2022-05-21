import { ClarityDataContext } from '@components/DataProvider'
import { HeaderButton } from '@components/clarityMenu/MenuButtons'
import { createPortal } from 'react-dom'
import { useContext } from 'react'
import { useImmer } from 'use-immer'

export function HeaderMenuPortal() {
   const clarityData = useContext(ClarityDataContext)
   const [status, setStatus] = useImmer(false)

   const observer = new MutationObserver((_, quit) => {
      if (document.querySelector(clarityData.locations?.header)) {
         setStatus(true)
         quit.disconnect()
      }
   })
   observer.observe(document, {
      childList: true,
      subtree: true
   })

   const headerMenu = document.querySelector(clarityData.locations?.header)

   return status && headerMenu ? createPortal(HeaderButton(), headerMenu) : null
}
