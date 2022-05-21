import { ClarityData } from 'src/globalData.interface'
import { Updater } from 'use-immer'

export default function useLocationFinder(setClarityData: Updater<ClarityData>) {
   const dimInfo = document.querySelector('html')?.firstChild?.nodeValue
   const savedVersion = JSON.parse(localStorage.getItem('claritySettings') || '{}').dimVersion
   const regex = new RegExp(savedVersion, 'g')

   if (dimInfo && savedVersion && regex.test(dimInfo)) return

   setClarityData((draft) => {
      draft.dimVersion = dimInfo?.match(/DIM v\d+.\d+.\d+/)?.[0] ?? ''
      draft.disableTheme = true
   })

   let locations: ClarityData['locations'] = {
      backgroundColor: [],
      dimMenu: '',
      header: '',
      inventoryItems: {
         all: {
            border: '.item-img',
            bottom: '',
            watermark: '',
            invisibleBorder: ''
         },
         consumable: {
            atCapacity: {
               bottom: '',
               commonBorder: '',
               rareBorder: '',
               legendaryBorder: '',
               exoticBorder: ''
            },
            maxStackSize: {
               bottom: ''
            }
         },
         deepsight: {
            border: '',
            borderImg: '',
            bottom: ''
         },
         masterwork: {
            border: '',
            bottom: '',
            borderImg: '',
            exoticBorderImg: ''
         },
         tags: {
            archive: '.app-icon.no-pointer-events.fas.fa-archive',
            favorite: '.app-icon.no-pointer-events.fas.fa-heart',
            infuse: '.app-icon.no-pointer-events.fas.fa-bolt',
            junk: '.app-icon.no-pointer-events.fas.fa-ban',
            keep: '.app-icon.no-pointer-events.fas.fa-tag',
            lock: '.app-icon.no-pointer-events.fas.fa-lock',
            note: '.app-icon.no-pointer-events.fas.fa-sticky-note'
         },
         thumbsDown: '.app-icon.no-pointer-events.fas.fa-thumbs-down',
         thumbsUp: '.app-icon.no-pointer-events.fas.fa-thumbs-up'
      }
   }

   function lookForLocation(elm: any) {
      let node: any
      for (node = elm.firstChild; node; node = node.nextSibling) {
         if (node.nodeType !== 1) continue // 1 === Element
         const nodeStylesBefore = window.getComputedStyle(node, '::before')
         const nodeStyles = window.getComputedStyle(node)

         // menu button on top left corner
         if (
            node.getAttribute('role') === 'button' &&
            node.getAttribute('aria-haspopup') === 'menu' &&
            node.getAttribute('aria-label') === 'Menu'
         ) {
            locations.dimMenu = `.${[...node.classList].join('.')}`
         }

         // background before
         if (
            nodeStylesBefore.backgroundImage ==
            'radial-gradient(circle at 50% 70px, rgb(57, 57, 86) 0%, rgb(22, 22, 39) 100%)'
         ) {
            locations.backgroundColor.push(`.${[...node?.classList].join('.')}::before`)
         }

         // background
         if (
            nodeStyles.backgroundImage ==
            'radial-gradient(circle at 50% 70px, rgb(57, 57, 86) 0%, rgb(22, 22, 39) 100%)'
         ) {
            locations.backgroundColor.push(`.${[...node.classList].join('.')}`)
         }

         // header
         if (node.href?.includes('/d2/organizer')) {
            locations.header = `.${[...node.parentNode.classList].join('.')}`
         }

         // invisible border
         if (nodeStyles.border === '1px solid rgba(0, 0, 0, 0)' && node.parentNode.classList.contains('item')) {
            locations.inventoryItems.all.invisibleBorder = `.${[...node.classList].join('.')}`
         }

         // masterwork border
         if (nodeStyles.border === '1px solid rgb(234, 222, 139)' && node.parentNode.classList.contains('item')) {
            locations.inventoryItems.masterwork.border = `.${[...node.classList].join('.')}`
         }

         // deepsight border
         if (nodeStyles.border === '1px solid rgb(210, 83, 54)' && node.parentNode.classList.contains('item')) {
            locations.inventoryItems.deepsight.border = `.${[...node.classList].join('.')}`
         }

         // consumable at capacity border common (can't get more)
         if (
            nodeStyles.border === '1px solid rgb(245, 220, 86)' &&
            nodeStyles.backgroundColor === 'rgb(54, 111, 66)' &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.consumable.atCapacity.commonBorder = `.${[...node.classList].join('.')}`
         }
         // consumable at capacity border rare (can't get more)
         if (
            nodeStyles.border === '1px solid rgb(245, 220, 86)' &&
            nodeStyles.backgroundColor === 'rgb(80, 118, 163)' &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.consumable.atCapacity.rareBorder = `.${[...node.classList].join('.')}`
         }
         // consumable at capacity border legendary (can't get more)
         if (
            nodeStyles.border === '1px solid rgb(245, 220, 86)' &&
            nodeStyles.backgroundColor === 'rgb(82, 47, 101)' &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.consumable.atCapacity.legendaryBorder = `.${[...node.classList].join('.')}`
         }
         // consumable at capacity border exotic (can't get more)
         if (
            nodeStyles.border === '1px solid rgb(245, 220, 86)' &&
            nodeStyles.backgroundColor === 'rgb(206, 174, 51)' &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.consumable.atCapacity.exoticBorder = `.${[...node.classList].join('.')}`
         }

         // deepsight border img
         if (
            nodeStyles.left === '1px' &&
            nodeStyles.top === '1px' &&
            nodeStyles.backgroundImage.startsWith(
               `url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAEOSURBVHhe7d2xEcIwEABBiX5owHRh6nQZNGAKgsSZCT1csptI8d/8KNTc1+UzyN`
            ) &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.deepsight.borderImg = `.${[...node.classList].join('.')}`
            locations.inventoryItems.deepsight.bottom = `.${[...node.nextSibling.classList].join('.')}`
         }

         // inventory item watermark
         if (
            nodeStyles.left === '0px' &&
            nodeStyles.top === '0px' &&
            node.parentNode.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.all.watermark = `.${[...node.parentNode.classList].join('.')}`
         }

         // masterwork item bottom background
         if (
            nodeStyles.backgroundColor === 'rgb(234, 222, 139)' &&
            node.firstChild.nodeName === 'SPAN' &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.masterwork.bottom = `.${[...node.classList].join('.')}`
         }
         // masterwork border img
         if (
            nodeStyles.left === '1px' &&
            nodeStyles.top === '1px' &&
            nodeStyles.backgroundImage.startsWith(
               `url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAJgklEQVR4AWI8t87oBYCd8rBuGAZi6N1JUQbIrJkiY6bM4EoE1EHvqb+WHsPvG5AJU522JQ/znpY03GzJ3YTovcvcVFcO5WbU8eH/OZ8R91B241c6wEzowJUUZnqlXMiZ`
            ) &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.masterwork.borderImg = `.${[...node.classList].join('.')}`
         }
         // exotic masterwork border img
         if (
            nodeStyles.left === '1px' &&
            nodeStyles.top === '1px' &&
            nodeStyles.backgroundImage.startsWith(
               `url(\"https://beta.destinyitemmanager.com/static/exotic-masterwork-8987e7.png\")`
            ) &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.masterwork.exoticBorderImg = `.${[...node.classList].join('.')}`
         }

         // item bottom background
         if (nodeStyles.backgroundColor === 'rgb(221, 221, 221)' && node.firstChild?.nodeName === 'SPAN') {
            locations.inventoryItems.all.bottom = `.${[...node.classList].join('.')}`
         }

         // consumable at capacity (can't get more)
         if (
            nodeStyles.color === 'rgb(242, 114, 27)' &&
            nodeStyles.fontWeight === '700' &&
            nodeStyles.backgroundColor === 'rgb(245, 220, 86)' &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.consumable.atCapacity.bottom = `.${[...node.classList].join('.')}`
         }

         // consumable max stack (can get more)
         if (
            nodeStyles.color === 'rgb(242, 114, 27)' &&
            nodeStyles.fontWeight === '700' &&
            nodeStyles.backgroundColor === 'rgb(221, 221, 221)' &&
            node.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.consumable.maxStackSize.bottom = `.${[...node.classList].join('.')}`
         }

         // masterwork watermark
         if (
            nodeStyles.left === '1px' &&
            nodeStyles.top === '1px' &&
            nodeStyles.backgroundImage.match(/data:image\/png;base64/) &&
            node.parentNode.parentNode.classList.contains('item')
         ) {
            locations.inventoryItems.all.watermark = `.${[...node.classList].join('.')}`
         }

         lookForLocation(node)
      }
   }

   // starts location finder then users inventory is loaded (items are displayed)

   const inventoryObserver = new MutationObserver((_, quit) => {
      if (document.getElementsByClassName('item')[0]) {
         quit.disconnect()
         lookForLocation(document.querySelector('#app'))
         setClarityData((draft) => {
            draft.locations = locations
            draft.disableTheme = false
         })
      }
   })
   inventoryObserver.observe(document, {
      childList: true,
      subtree: true
   })
}
