import { ClarityDataContext, SetClarityDataContext } from '@components/DataProvider'
import { useContext, useRef } from 'react'

import { MenuContent } from './MenuContent'
import { MenuLinks } from './MenuLinks'
import styles from '@styles/ClarityMenu/ClarityMenu.module.scss'
import useOnClickOutside from '@hooks/useOnClickOutside'

export function ClarityMenu() {
   const setClarityData = useContext(SetClarityDataContext)
   const clarityData = useContext(ClarityDataContext)
   const clarityMenuRef = useRef<HTMLDivElement>(null)
   useOnClickOutside(
      () => {
         setClarityData((draft) => {
            draft.menuState = false
         })
      },
      clarityMenuRef,
      undefined,
      'clarityHeaderButton'
   )

   return clarityData.menuState ? (
      <div className={styles.mainWindow} ref={clarityMenuRef}>
         <div className={styles.scrollContainer}>
            <header>
               <div>
                  Extension is created and maintained by Icemourne <br /> You can report bugs and ask for new features
                  on Discord
               </div>
            </header>
            <footer>
               <MenuLinks />
               <MenuContent />
            </footer>
         </div>
      </div>
   ) : null
}
