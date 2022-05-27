import { SetClarityDataContext } from '@components/DataProvider'
import styles from '@styles/clarityMenu/MenuButtons.module.scss'
import { useContext } from 'react'

export function HeaderButton() {
   const setClarityData = useContext(SetClarityDataContext)
   const changeOpenCloseStatus = () => {
      setClarityData((draft) => {
         draft.menuState = !draft.menuState
      })
   }

   return (
      <div onClick={changeOpenCloseStatus} id="clarityHeaderButton" className={styles.headerMenuButton}>
         Clarity menu
      </div>
   )
}

export function dimMenuButton() {
   const setClarityData = useContext(SetClarityDataContext)
   const changeOpenCloseStatus = () => {
      setClarityData((draft) => {
         draft.menuState = !draft.menuState
      })
   }

   return (
      <div onClick={changeOpenCloseStatus} id="clarityHeaderButton" className={styles.dimMenuButton}>
         Clarity menu
      </div>
   )
}
