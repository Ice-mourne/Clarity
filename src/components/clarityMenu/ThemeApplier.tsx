import { ClarityData, Theme } from '@interfaces/globalData.interface'

import { ClarityDataContext } from '@components/DataProvider'
import { useContext } from 'react'
import { useGetTheme } from '@hooks/useGetUpdateTheme'

const backgroundStyles = (location: ClarityData['locations'], theme: Theme['background']) => {
   const background = `
      background: radial-gradient(circle at ${theme.circlePositionHorizontal[0]}% ${theme.circlePositionVertical[0]}%,
         ${theme.circleColor[0]} ${theme.circleSize[0]}%,
         ${theme.backgroundColor[0]} ${theme.circleSpread[0]}%);
      background-repeat: no-repeat;
      background-size: 100vw 100vh;
   `
   return `
      ${location.backgroundColor?.[0]},
      ${location.backgroundColor?.[1]},
      ${location.backgroundColor?.[2]},
      ${location.backgroundColor?.[3]} {
         ${background}
         background-position: center -44px;
      }
      ${location.backgroundColor?.[1]} {
         background-position: center top;
      }
   `
}

const invItemAllStyles = (
   location: ClarityData['locations']['inventoryItems']['all'],
   theme: Theme['inventoryItems']['all']
) => {
   return `
      ${'' /* All inventory items > bottom part */}
      ${location.bottom} {
         ${theme.bottomBackground[1] ? `background-color: ${theme.bottomBackground[0]};` : ''}
         ${theme.powerLevel[1] ? `color: ${theme.powerLevel[0]};` : ''}
         ${
            theme.borderType === 'fullBorder'
               ? `
                  border: none;
                  border-left: 1px solid;
                  border-right: 1px solid;
                  border-bottom: 1px solid;
                  border-color: ${theme.border[0]};
               `
               : ''
         }
      }
      ${'' /* All inventory items > img */}
      ${location.img} {
         ${theme.powerLevel[1] ? `color: ${theme.powerLevel[0]};` : ''}
         ${
            theme.borderType === 'fullBorder'
               ? `
               border: none;
               border: 1px solid;
               border-color: ${theme.border[0]};
             `
               : theme.border[0].match(/#.{6}00$/) || theme.borderType === 'noBorder'
               ? `border: none;`
               : `border-color: ${theme.border[0]};`
         }
      }

      ${'' /* Items with out border */}
      ${location.imgWithInvisibleBorder} {
         border-color: #00000000;
         background-color: #00000000;
      }

      ${'' /* If border is invisible adust watermark*/}
      ${location.watermark} ${
      theme.border[0].match(/#.{6}00$/)
         ? `{
                  top: 0px;
                  left: 0px;
                  height: var(--item-size);
                  width: var(--item-size);
               }`
         : `{}`
   }
   `
}

const consumableStyles = (
   location: ClarityData['locations']['inventoryItems']['consumable'],
   theme: Theme['inventoryItems']['consumable']
) => {
   return `
      ${'' /* Consumable items caped > bottom part */}
      ${location.capped.bottom} {
         ${theme.capped.bottomBackground[1] ? `background-color: ${theme.capped.bottomBackground[0]};` : ''}
         ${theme.capped.numberOfItems[1] ? `color: ${theme.capped.numberOfItems[0]};` : ''}
         ${
            theme.capped.borderType === 'fullBorder'
               ? `
            border: none;
            border-left: 1px solid;
            border-right: 1px solid;
            border-bottom: 1px solid;
            border-color: ${theme.capped.border[0]};
         `
               : ''
         }
      }

      ${'' /* Consumable items caped > img */}
      ${location.capped.commonItemImg},
      ${location.capped.rareItemImg},
      ${location.capped.legendaryItemImg},
      ${location.capped.exoticItemImg} {
         ${
            theme.capped.borderType === 'fullBorder'
               ? `
               border: none;
               border-left: 1px solid;
               border-right: 1px solid;
               border-top: 1px solid;
               border-color: ${theme.capped.border[0]};
            `
               : theme.capped.border[0].match(/#.{6}00$/) || theme.capped.borderType === 'noBorder'
               ? `border: none;`
               : `border-color: ${theme.capped.border[0]};`
         }
      }

      ${'' /* Consumable items full stack > bottom part */}
      ${location.fullStack.bottom} {
         ${theme.fullStack.bottomBackground[1] ? `background-color: ${theme.fullStack.bottomBackground[0]};` : ''}
         ${theme.fullStack.numberOfItems[1] ? ` color: ${theme.fullStack.numberOfItems[0]};` : ''}
      }
   `
}

const deepsightStyles = (
   location: ClarityData['locations']['inventoryItems']['deepsight'],
   theme: Theme['inventoryItems']['deepsight']
) => {
   return `
      ${location.img} {
         ${
            theme.borderType === 'fullBorder'
               ? `
               border: none;
               border-left: 1px solid;
               border-right: 1px solid;
               border-top: 1px solid;
               border-color: ${theme.border[0]};
            `
               : theme.border[0].match(/#.{6}00$/) || theme.borderType === 'noBorder'
               ? `border: none;`
               : `border-color: ${theme.border[0]};`
         }
      }
      ${location.imgBorderImg} {
         ${
            theme.border[0].match(/#.{6}00$/) || theme.borderType === 'noBorder'
               ? 'background-image: none;'
               : `
                  top: 0px;
                  left: 0px;
                  height: var(--item-size);
                  width: var(--item-size);
                  background-image: none;
                  border: inset 2px;
                  border-style: solid;
                  border-color: ${theme.border[0]};
               `
         }

      }
      ${location.bottom} {
         background-color: ${theme.bottomBackground[0]};
         color: ${theme.powerLevel[0]};
         ${
            theme.borderType === 'fullBorder'
               ? `
               border: none;
               border-left: 1px solid;
               border-right: 1px solid;
               border-bottom: 1px solid;
               border-color: ${theme.border[0]};
            `
               : theme.border[0].match(/#.{6}00$/) || theme.borderType === 'noBorder'
               ? `border: none;`
               : `
                  border-color: ${theme.border[0]};
                  border-left: none;
                  border-right: none;
                  border-bottom: none;
               `
         }
      }
   `
}

const masterworkStyles = (
   location: ClarityData['locations']['inventoryItems']['masterwork'],
   theme: Theme['inventoryItems']['masterwork']
) => {
   return `
      ${location.bottom} {
         ${theme.bottomBackground[1] ? `background-color: ${theme.bottomBackground[0]};` : ''}
         ${theme.powerLevel[1] ? `color: ${theme.powerLevel[0]};` : ''}
         ${
            theme.borderType === 'fullBorder'
               ? `
            border: none;
            border-left: 1px solid;
            border-right: 1px solid;
            border-bottom: 1px solid;
            border-color: ${theme.border[0]};
         `
               : ''
         }
      }
      ${location.img} {
         ${theme.powerLevel[1] ? `color: ${theme.powerLevel[0]};` : ''}
         ${
            theme.borderType === 'fullBorder'
               ? `
               border: none;
               border-left: 1px solid;
               border-right: 1px solid;
               border-top: 1px solid;
               border-color: ${theme.border[0]};
            `
               : theme.border[0].match(/#.{6}00$/) || theme.borderType === 'noBorder'
               ? `border: none;`
               : `border-color: ${theme.border[0]};`
         }
      }
      ${location.imgBorderImg},
      ${location.imgBorderImgExotic} {
         top: 0px;
         left: 0px;
         height: var(--item-size);
         width: var(--item-size);
      }
   `
}

const tagStyles = (theme: Theme['inventoryItems']['tags']) => {
   return `
      .item .fa-archive {
         ${theme.archive[1] ? `color: ${theme.archive[0]};` : ''}
      }
      .item .fa-heart {
         ${theme.favorite[1] ? `color: ${theme.favorite[0]};` : ''}
      }
      .item .fa-bolt {
         ${theme.infuse[1] ? `color: ${theme.infuse[0]};` : ''}
      }
      .item .fa-ban {
         ${theme.junk[1] ? `color: ${theme.junk[0]};` : ''}
      }
      .item .fa-tag {
         ${theme.keep[1] ? `color: ${theme.keep[0]};` : ''}
      }
      .item .fa-lock {
         ${theme.lock[1] ? `color: ${theme.lock[0]};` : ''}
      }
      .item .fa-sticky-note {
         ${theme.note[1] ? `color: ${theme.note[0]};` : ''}
      }
   `
}

const thumbStyles = (theme: Theme['inventoryItems']) => {
   return `
      .item .fa-thumbs-down {
         ${theme.thumbsDown[1] ? `color: ${theme.thumbsDown[0]};` : ''}
      }
      .item .fa-thumbs-up {
         ${theme.thumbsUp[1] ? `color: ${theme.thumbsUp[0]};` : ''}
      }
   `
}

export default function ThemeApplier() {
   const clarityData = useContext(ClarityDataContext)
   const theme = useGetTheme()

   if (!clarityData.locations.inventoryItems || !theme?.inventoryItems) return

   const styles = `
      ${backgroundStyles(clarityData.locations, theme.background)}
      ${invItemAllStyles(clarityData.locations.inventoryItems.all, theme.inventoryItems.all)}
      ${consumableStyles(clarityData.locations.inventoryItems.consumable, theme.inventoryItems.consumable)}
      ${deepsightStyles(clarityData.locations.inventoryItems.deepsight, theme.inventoryItems.deepsight)}
      ${masterworkStyles(clarityData.locations.inventoryItems.masterwork, theme.inventoryItems.masterwork)}
      ${tagStyles(theme.inventoryItems.tags)}
      ${thumbStyles(theme.inventoryItems)}
   `
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => (s.match(/^\.|^\}/) ? s : `   ${s}`))
      .join('\n')

   return clarityData.disableTheme ? null : <style>{styles}</style>
}
