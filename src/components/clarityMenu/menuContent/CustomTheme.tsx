import { ChangeEvent, useContext, useState } from 'react'
import { SetThemeContext, ThemeContext } from '@components/provider/ThemeProvider'
import { useGetThemeValue, useResetTheme, useUpdateTheme } from '@hooks/useGetUpdateTheme'

import ColorPickerMenu from '../ColorPickerMenu'
import RangeInput from '../RangeInput'
import styles from '@styles/ClarityMenu/menuContent/CustomTheme.module.scss'

export function CustomTheme() {
   const themes = useContext(ThemeContext)
   const setTheme = useContext(SetThemeContext)

   const [display, setDisplay] = useState<{ [key: string]: boolean }>({
      background: false,
      allInventoryItems: false,
      masterwork: false,
      deepsight: false,
      consumableCapped: false,
      consumableFullStack: false,
      thumbs: false,
      tags: false,
      settings: false
   })

   const handleClick = (key: string) => {
      setDisplay({
         ...display,
         [key]: !display[key]
      })
   }

   const changeBorderType = (event: ChangeEvent<HTMLSelectElement>, location: Array<string>) => {
      useUpdateTheme(themes, setTheme, 'border', location, event.target.value)
   }

   const jsx = {
      settings: <div className={styles.content}> Work in progress </div>,
      background: (
         <div className={styles.content}>
            <span>Circle color</span>
            <ColorPickerMenu location={['background', 'circleColor']} />

            <span>Circle size</span>
            <RangeInput min={0} max={100} location={['background', 'circleSize']} />
            <button onClick={() => useResetTheme(themes, setTheme, ['background', 'circleSize'])}>Reset</button>

            <span>Circle spread</span>
            <RangeInput min={0} max={200} location={['background', 'circleSpread']} />
            <button onClick={() => useResetTheme(themes, setTheme, ['background', 'circleSpread'])}>Reset</button>

            <span>Circle vertical position</span>
            <RangeInput min={-100} max={100} location={['background', 'circlePositionVertical']} />
            <button onClick={() => useResetTheme(themes, setTheme, ['background', 'circlePositionVertical'])}>
               Reset
            </button>

            <span>Circle horizontal position</span>
            <RangeInput min={0} max={100} location={['background', 'circlePositionHorizontal']} />
            <button onClick={() => useResetTheme(themes, setTheme, ['background', 'circlePositionHorizontal'])}>
               Reset
            </button>

            <span>Background color</span>
            <ColorPickerMenu location={['background', 'backgroundColor']} />
         </div>
      ),
      allInventoryItems: (
         <div className={styles.content}>
            <span>Border Type</span>
            <select
               onChange={(e) => changeBorderType(e, ['inventoryItems', 'all', 'borderType'])}
               value={useGetThemeValue(['inventoryItems', 'all', 'borderType'])[0]}
            >
               <option value="fullBorder">Full border</option>
               <option value="minimalBorder">Minimal border</option>
               <option value="noBorder">No border</option>
            </select>
            <span>Border</span>
            <ColorPickerMenu location={['inventoryItems', 'all', 'border']} />
            <span>Bottom background</span>
            <ColorPickerMenu location={['inventoryItems', 'all', 'bottomBackground']} />
            <span>Power lvl</span>
            <ColorPickerMenu location={['inventoryItems', 'all', 'powerLevel']} />
         </div>
      ),
      consumableCapped: (
         <div className={styles.content}>
            <span>Border Type</span>
            <select
               onChange={(e) => changeBorderType(e, ['inventoryItems', 'consumable', 'capped', 'borderType'])}
               value={useGetThemeValue(['inventoryItems', 'consumable', 'capped', 'borderType'])[0]}
            >
               <option value="fullBorder">Full border</option>
               <option value="minimalBorder">Minimal border</option>
               <option value="noBorder">No border</option>
            </select>
            <span>Border</span>
            <ColorPickerMenu location={['inventoryItems', 'consumable', 'capped', 'border']} />
            <span>Bottom background</span>
            <ColorPickerMenu location={['inventoryItems', 'consumable', 'capped', 'bottomBackground']} />
            <span>Number of items</span>
            <ColorPickerMenu location={['inventoryItems', 'consumable', 'capped', 'numberOfItems']} />
         </div>
      ),
      consumableFullStack: (
         <div className={styles.content}>
            <span>Bottom background</span>
            <ColorPickerMenu location={['inventoryItems', 'consumable', 'fullStack', 'bottomBackground']} />
            <span>Number of items</span>
            <ColorPickerMenu location={['inventoryItems', 'consumable', 'fullStack', 'numberOfItems']} />
         </div>
      ),
      deepsight: (
         <div className={styles.content}>
            <span>Border Type</span>
            <select
               onChange={(e) => changeBorderType(e, ['inventoryItems', 'deepsight', 'borderType'])}
               value={useGetThemeValue(['inventoryItems', 'deepsight', 'borderType'])[0]}
            >
               <option value="fullBorder">Full border</option>
               <option value="minimalBorder">Minimal border</option>
               <option value="noBorder">No border</option>
            </select>
            <span>Border</span>
            <ColorPickerMenu location={['inventoryItems', 'deepsight', 'border']} />
            <span>Bottom background</span>
            <ColorPickerMenu location={['inventoryItems', 'deepsight', 'bottomBackground']} />
            <span>Power lvl</span>
            <ColorPickerMenu location={['inventoryItems', 'deepsight', 'powerLevel']} />
         </div>
      ),
      masterwork: (
         <div className={styles.content}>
            <span>Border Type</span>
            <select
               onChange={(e) => changeBorderType(e, ['inventoryItems', 'masterwork', 'borderType'])}
               value={useGetThemeValue(['inventoryItems', 'masterwork', 'borderType'])[0]}
            >
               <option value="fullBorder">Full border</option>
               <option value="noBorder">No border</option>
            </select>
            <span>Border</span>
            <ColorPickerMenu location={['inventoryItems', 'masterwork', 'border']} />
            <span>Bottom background</span>
            <ColorPickerMenu location={['inventoryItems', 'masterwork', 'bottomBackground']} />
            <span>Power lvl</span>
            <ColorPickerMenu location={['inventoryItems', 'masterwork', 'powerLevel']} />
         </div>
      ),
      tags: (
         <div className={styles.content}>
            <span>Archive</span>
            <ColorPickerMenu location={['inventoryItems', 'tags', 'archive']} />
            <span>Favorite</span>
            <ColorPickerMenu location={['inventoryItems', 'tags', 'favorite']} />
            <span>Infuse</span>
            <ColorPickerMenu location={['inventoryItems', 'tags', 'infuse']} />
            <span>Junk</span>
            <ColorPickerMenu location={['inventoryItems', 'tags', 'junk']} />
            <span>Keep</span>
            <ColorPickerMenu location={['inventoryItems', 'tags', 'keep']} />
            <span>Lock</span>
            <ColorPickerMenu location={['inventoryItems', 'tags', 'lock']} />
            <span>Note</span>
            <ColorPickerMenu location={['inventoryItems', 'tags', 'note']} />
         </div>
      ),
      thumbs: (
         <div className={styles.content}>
            <span>Down</span>
            <ColorPickerMenu location={['inventoryItems', 'thumbsDown']} />
            <span>Up</span>
            <ColorPickerMenu location={['inventoryItems', 'thumbsUp']} />
         </div>
      )
   }
   const caretDown = <span className="app-icon no-pointer-events fas fa-caret-down collapse-icon"></span>
   const caretRight = <span className="app-icon no-pointer-events fas fa-caret-right collapse-icon"></span>
   return (
      <>
         <title>Custom Theme</title>

         <div className={styles.themeOptions}>
            <div>
               <div className={styles.option} onClick={() => handleClick('settings')}>
                  {display.settings ? caretDown : caretRight}
                  <span className={styles.name}>Settings</span>
               </div>
            </div>
            {display.settings ? jsx.settings : null}

            {/* Background */}
            <div
               className={`${styles.option} ${display.background ? styles.optionSelected : ''}`}
               onClick={() => handleClick('background')}
            >
               {display.background ? caretDown : caretRight}
               <span className={styles.name}>Background</span>
            </div>
            {display.background ? jsx.background : null}

            {/* All inventory items */}
            <div
               className={`${styles.option} ${display.allInventoryItems ? styles.optionSelected : ''}`}
               onClick={() => handleClick('allInventoryItems')}
            >
               {display.allInventoryItems ? caretDown : caretRight}
               <span className={styles.name}>All inventory items</span>
            </div>
            {display.allInventoryItems ? jsx.allInventoryItems : null}

            {/* Consumable capped */}
            <div
               className={`${styles.option} ${display.consumableCapped ? styles.optionSelected : ''}`}
               onClick={() => handleClick('consumableCapped')}
            >
               {display.consumableCapped ? caretDown : caretRight}
               <span className={styles.name}>Consumable capped</span>
            </div>
            {display.consumableCapped ? jsx.consumableCapped : null}

            {/* Consumable full stack */}
            <div
               className={`${styles.option} ${display.consumableFullStack ? styles.optionSelected : ''}`}
               onClick={() => handleClick('consumableFullStack')}
            >
               {display.consumableFullStack ? caretDown : caretRight}
               <span className={styles.name}>Consumable full stack</span>
            </div>
            {display.consumableFullStack ? jsx.consumableFullStack : null}

            {/* Deepsight */}
            <div
               className={`${styles.option} ${display.deepsight ? styles.optionSelected : ''}`}
               onClick={() => handleClick('deepsight')}
            >
               {display.deepsight ? caretDown : caretRight}
               <span className={styles.name}>Deepsight</span>
            </div>
            {display.deepsight ? jsx.deepsight : null}

            {/* Masterwork */}
            <div
               className={`${styles.option} ${display.masterwork ? styles.optionSelected : ''}`}
               onClick={() => handleClick('masterwork')}
            >
               {display.masterwork ? caretDown : caretRight}
               <span className={styles.name}>Masterwork</span>
            </div>
            {display.masterwork ? jsx.masterwork : null}

            {/* Tags */}
            <div
               className={`${styles.option} ${display.tags ? styles.optionSelected : ''}`}
               onClick={() => handleClick('tags')}
            >
               {display.tags ? caretDown : caretRight}
               <span className={styles.name}>Tags</span>
            </div>
            {display.tags ? jsx.tags : null}

            {/* Thumbs */}
            <div
               className={`${styles.option} ${display.thumbs ? styles.optionSelected : ''}`}
               onClick={() => handleClick('thumbs')}
            >
               {display.thumbs ? caretDown : caretRight}
               <span className={styles.name}>Thumbs</span>
            </div>
            {display.thumbs ? jsx.thumbs : null}
         </div>
      </>
   )
}
