import { ClarityDataContext } from '@components/DataProvider'
import { createPortal } from 'react-dom'
import { dimMenuButton } from '@components/clarityMenu/MenuButtons'
import { useContext } from 'react'
import { useImmer } from 'use-immer'

export function PopOutMenuPortal() {
   const clarityData = useContext(ClarityDataContext)
   const [status, setStatus] = useImmer(false)

   const observeMenuButton = () => {
      const header = document.querySelector(clarityData.locations?.dimMenu)?.parentElement as HTMLElement

      const observer = new MutationObserver((mutations, quit) => {
         const newNode = mutations[0].addedNodes[0] as HTMLElement

         if (newNode?.getAttribute('role') === 'menu') {
            const container = document.createElement('div')
            container.id = 'clarityMenuContainer'
            newNode?.insertBefore(container, newNode.querySelector('hr'))
            setStatus(true)
         } else if (mutations[0].addedNodes.length === 0) {
            setStatus(false)
         }
      })
      observer.observe(header, {
         childList: true,
         subtree: true
      })
   }

   const observerMenuButton = new MutationObserver((_, quit) => {
      if (document.querySelector(clarityData.locations?.dimMenu)) {
         quit.disconnect()
         observeMenuButton()
      }
   })
   observerMenuButton.observe(document, {
      childList: true,
      subtree: true
   })

   const headerMenu = document.getElementById('clarityMenuContainer')

   return status && headerMenu ? createPortal(dimMenuButton(), headerMenu) : null
}
