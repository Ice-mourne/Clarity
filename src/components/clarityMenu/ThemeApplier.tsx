import { ClarityDataContext } from '@components/DataProvider'
import { useContext } from 'react'

export default function ThemeApplier() {
   const clarityData = useContext(ClarityDataContext)
   const locations = clarityData.locations
   const invItemLock = clarityData.locations.inventoryItems

   const theme = clarityData.theme
   const invItemTheme = clarityData.theme.inventoryItems

   const background = `
      background: radial-gradient(circle at ${theme.background.centerColorHorizontal}% ${theme.background.centerColorVertical}%,
         ${theme.background.centerColor} ${theme.background.centerColorSpread}%,
         ${theme.background.surroundingColor} ${theme.background.surroundingColorSpread}%);
      background-repeat: no-repeat;
      background-size: 100vw 100vh;
   `

   if (!invItemLock || !invItemTheme) return

   const styles = `
      ${locations.backgroundColor?.[0]},
      ${locations.backgroundColor?.[1]},
      ${locations.backgroundColor?.[2]},
      ${locations.backgroundColor?.[3]} {
         ${background}
         background-position: center -44px;
      }
      ${locations.backgroundColor?.[1]} {
         background-position: center top;
      }

      ${invItemLock.all.bottom} {
         background-color: ${invItemTheme.all.bottom};
         color: ${invItemTheme.all.powerLevel};
      }
      ${invItemLock.all.border} {
         border-color: ${invItemTheme.all.border};
      }
      ${invItemLock.all.invisibleBorder} {
         border-color: #00000000;
      }
      ${invItemLock.all.watermark} ${
         invItemTheme.all.border.match(/#.{6}00$/) ? `{
            top: 0px;
            left: 0px;
            height: var(--item-size);
            width: var(--item-size);
         }` : `{}`
      }

      ${invItemLock.consumable.atCapacity.bottom} {
         background-color: ${invItemTheme.consumable.atCapacity.bottom};
         color: ${invItemTheme.consumable.atCapacity.numberOfItems};
      }
      ${invItemLock.consumable.atCapacity.commonBorder},
      ${invItemLock.consumable.atCapacity.rareBorder},
      ${invItemLock.consumable.atCapacity.legendaryBorder},
      ${invItemLock.consumable.atCapacity.exoticBorder} {
         border-color: ${invItemTheme.consumable.atCapacity.border};
      }

      ${invItemLock.consumable.maxStackSize.bottom} {
         background-color: ${invItemTheme.consumable.maxStackSize.bottom};
         color: ${invItemTheme.consumable.maxStackSize.numberOfItems};
      }

      ${invItemLock.deepsight.border} {
         border-color: ${invItemTheme.deepsight.border};
      }
      ${invItemLock.deepsight.borderImg} {
         top: 0px;
         left: 0px;
         height: var(--item-size);
         width: var(--item-size);
         background-image: none;
         border: inset 2px;
         border-style: solid;
         border-color: ${invItemTheme.deepsight.border};
      }
      ${invItemLock.deepsight.bottom} {
         background-color: ${invItemTheme.deepsight.bottom};
         color: ${invItemTheme.deepsight.powerLevel};
         border-bottom: 1px solid;
         border-left: 1px solid;
         border-right: 1px solid;
         border-color: ${invItemTheme.deepsight.border};
      }

      ${invItemLock.masterwork.bottom} {
         background-color: ${invItemTheme.masterwork.bottom};
         color: ${invItemTheme.masterwork.powerLevel};
      }
      ${invItemLock.masterwork.border} {
         border-color: ${invItemTheme.masterwork.border};
      }
      ${invItemLock.masterwork.borderImg},
      ${invItemLock.masterwork.exoticBorderImg} {
         top: 0px;
         left: 0px;
         height: var(--item-size);
         width: var(--item-size);
      }

      ${invItemLock.tags.junk} {
         color: ${invItemTheme.tags.junk};
      }
      ${invItemLock.tags.keep} {
         color: ${invItemTheme.tags.keep};
      }
      ${invItemLock.tags.lock} {
         color: ${invItemTheme.tags.lock};
      }
      ${invItemLock.tags.note} {
         color: ${invItemTheme.tags.note};
      }

      ${invItemLock.tags.archive} {
         color: ${invItemTheme.tags.archive};
      }
      ${invItemLock.tags.favorite} {
         color: ${invItemTheme.tags.favorite};
      }
      ${invItemLock.tags.infuse} {
         color: ${invItemTheme.tags.infuse};
      }

      ${invItemLock.thumbsDown} {
         color: ${invItemTheme.thumbsDown};
      }
      ${invItemLock.thumbsUp} {
         color: ${invItemTheme.thumbsUp};
      }
   `//.split('\n').map(s => s.trim()).filter(s => s.length > 0).join(' ')

   return clarityData.disableTheme ? null : <style>{styles}</style>
}
