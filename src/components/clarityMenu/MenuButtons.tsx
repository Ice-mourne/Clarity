import { SetClarityDataContext } from '@components/DataProvider'
import { useContext } from 'react'

export function HeaderButton() {
   const setClarityData = useContext(SetClarityDataContext)
   const changeOpenCloseStatus = () => {
      setClarityData((draft) => {
         draft.menuState = !draft.menuState
      })
   }

   return <button onClick={changeOpenCloseStatus} id="clarityHeaderButton">Clarity menu</button>
}
