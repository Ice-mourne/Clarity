import { ClarityDataContext, SetClarityDataContext } from '@components/DataProvider'
import { useContext, useState } from 'react'

import ColorPickerMenu from '../ColorPickerMenu'
import styles from '@styles/ClarityMenu/menuContent/CustomTheme.module.scss'

export function CustomTheme() {
   const [display, setDisplay] = useState<{ [key: string]: boolean }>({
      background: false,
      allInventoryItems: false,
      masterwork: false,
      deepsight: false,
      consumableAtCapacity: false,
      atCapacityMaxStackSize: false,
      thumbs: false,
      tags: false
   })

   const handleClick = (key: string) => {
      setDisplay({
         ...display,
         [key]: !display[key]
      })
   }

   const setClarityData = useContext(SetClarityDataContext)
   const clarityData = useContext(ClarityDataContext)

   const backgroundOptions = clarityData.theme.background

   const arrowDown = <span className="app-icon no-pointer-events fas fa-caret-down collapse-icon"></span>
   return (
      <>
         <title>Custom Theme</title> {/* todo replace title its for internal use only this */}
         <div className={styles.colorDisplay}>
            <div className={styles.span2} onClick={() => handleClick('background')}>
               <span className={styles.name}>Background</span>
               {arrowDown}
            </div>
            {display.background ? (
               <>
                  <span>Circle color</span>
                  <ColorPickerMenu identifier="theme.background.centerColor" />
                  <span>Circle size</span>
                  <input
                     type="range"
                     min="0"
                     max="100"
                     value={backgroundOptions.centerColorSpread}
                     onChange={(e) => {
                        setClarityData((draft) => {
                           draft.theme.background.centerColorSpread = Number(e.target.value)
                        })
                     }}
                  />
                  <span>Circle spread</span>
                  <input
                     type="range"
                     min="0"
                     max="200"
                     value={backgroundOptions.surroundingColorSpread}
                     onChange={(e) => {
                        setClarityData((draft) => {
                           draft.theme.background.surroundingColorSpread = Number(e.target.value)
                        })
                     }}
                  />
                  <span>Circle vertical position</span>
                  <input
                     type="range"
                     min="-100"
                     max="100"
                     value={backgroundOptions.centerColorVertical / 2}
                     onChange={(e) => {
                        setClarityData((draft) => {
                           draft.theme.background.centerColorVertical = Number(e.target.value) * 2
                        })
                     }}
                  />
                  <span>Circle horizontal position</span>
                  <input
                     type="range"
                     min="0"
                     max="100"
                     value={backgroundOptions.centerColorHorizontal}
                     onChange={(e) => {
                        setClarityData((draft) => {
                           draft.theme.background.centerColorHorizontal = Number(e.target.value)
                        })
                     }}
                  />
                  <span>Background color</span>
                  <ColorPickerMenu identifier="theme.background.surroundingColor" />
               </>
            ) : null}

            <div className={styles.span2} onClick={() => handleClick('allInventoryItems')}>
               <span className={styles.name}>All inventory items</span>
               {arrowDown}
            </div>
            {display.allInventoryItems ? (
               <>
                  <span>Border</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.all.border" />
                  <span>Bottom background</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.all.bottom" />
                  <span>Power lvl</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.all.powerLevel" />
               </>
            ) : null}

            <div className={styles.span2} onClick={() => handleClick('consumableAtCapacity')}>
               <span className={styles.name}>Consumable at capacity (can't get more)</span>
               {arrowDown}
            </div>
            {display.consumableAtCapacity ? (
               <>
                  <span>Border</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.consumable.atCapacity.border" />
                  <span>Bottom background</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.consumable.atCapacity.bottom" />
                  <span>Number of items</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.consumable.atCapacity.numberOfItems" />
               </>
            ) : null}

            <div className={styles.span2} onClick={() => handleClick('atCapacityMaxStackSize')}>
               <span className={styles.name}>Consumable full stack</span>
               {arrowDown}
            </div>
            {display.atCapacityMaxStackSize ? (
               <>
                  <span>Bottom background</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.consumable.maxStackSize.bottom" />
                  <span>Number of items</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.consumable.maxStackSize.numberOfItems" />
               </>
            ) : null}

            <div className={styles.span2} onClick={() => handleClick('deepsight')}>
               <span className={styles.name}>Deepsight</span>
               {arrowDown}
            </div>
            {display.deepsight ? (
               <>
                  <span>Border</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.deepsight.border" />
                  <span>Bottom background</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.deepsight.bottom" />
                  <span>Power lvl</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.deepsight.powerLevel" />
               </>
            ) : null}

            <div className={styles.span2} onClick={() => handleClick('masterwork')}>
               <span className={styles.name}>Masterwork</span>
               {arrowDown}
            </div>
            {display.masterwork ? (
               <>
                  <span>Border</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.masterwork.border" />
                  <span>Bottom background</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.masterwork.bottom" />
                  <span>Power lvl</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.masterwork.powerLevel" />
               </>
            ) : null}

            <div className={styles.span2} onClick={() => handleClick('tags')}>
               <span className={styles.name}>Tags</span>
               {arrowDown}
            </div>

            {display.tags ? (
               <>
                  <span>Archive</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.tags.archive" />
                  <span>Favorite</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.tags.favorite" />
                  <span>Infuse</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.tags.infuse" />
                  <span>Junk</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.tags.junk" />
                  <span>Keep</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.tags.keep" />
                  <span>Lock</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.tags.lock" />
                  <span>Note</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.tags.note" />
               </>
            ) : null}

            <div className={styles.span2} onClick={() => handleClick('thumbs')}>
               <span className={styles.name}>Thumbs</span>
               {arrowDown}
            </div>
            {display.thumbs ? (
               <>
                  <span>Down</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.thumbsDown" />
                  <span>Up</span>
                  <ColorPickerMenu identifier="theme.inventoryItems.thumbsUp" />
               </>
            ) : null}
         </div>
      </>
   )
}
