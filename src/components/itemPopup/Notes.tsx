import { ChangeEvent, useContext, useState } from 'react'

import styles from '@styles/itemPopup/Notes.module.scss'
import { ProviderContext, SetProviderContext } from '@components/provider/DataProvider'

export default function Notes() {
   const context = useContext(ProviderContext)
   const setContext = useContext(SetProviderContext)
   const [showButton, setShowButton] = useState(true)

   // show text are and press on same button in DIM
   const pressNotes = () => {
      const notesButtonDIM: HTMLDivElement | null = document.querySelector(
         `#app .item-popup .item-details-body div[role='button']`
      )
      notesButtonDIM?.click()
      setShowButton(false)
   }

   const addTextToDIM = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const notesTextareaDIM: HTMLTextAreaElement | null = document.querySelector(
         `#app .item-popup .item-details-body form[name='notes'] textarea`
      )
      notesTextareaDIM ? (notesTextareaDIM.value = e.target.value) : null
      setContext((prev) => {
         const id = prev.clickedItem?.unique?.id

         if (!prev.usersInventory || !id) return prev
         prev.usersInventory[id].note = e.target.value
         return prev
      })
   }

   const note = context.clickedItem?.unique?.note

   return (
      <div className={styles.notes_box}>
         {showButton ? (
            <div className={styles.button} onClick={pressNotes}>
               <span className={`fas fa-pencil-alt ${styles.pencil}`}></span>
               {note ? (
                  <>
                     <span>Notes: </span>
                     <span className={styles.note_text}>{note}</span>
                  </>
               ) : (
                  <span>Add a note</span>
               )}
            </div>
         ) : (
            <textarea onChange={addTextToDIM} placeholder="Add notes to this item or don't">
               {note}
            </textarea>
         )}
      </div>
   )
}
