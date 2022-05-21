import 'react-color-palette/lib/css/styles.css'

import { ClarityDataContext, SetClarityDataContext } from '@components/DataProvider'
import { Color, ColorPicker, useColor } from 'react-color-palette'
import { useContext, useRef, useState } from 'react'

import styles from '@styles/ClarityMenu/ColorPickerMenu.module.scss'
import useOnClickOutside from '@hooks/useOnClickOutside'

export default function ColorPickerMenu({ identifier }: { identifier: string }) {
   let clarityData = useContext(ClarityDataContext) as any
   const getSavedColor = (): string => {
      const pathArr = identifier.split('.')
      let i
      for (i = 0; i < pathArr.length - 1; i++) {
         clarityData = clarityData[pathArr[i]]
      }
      return clarityData[pathArr[i]]
   }

   const [color, setColor] = useColor('hex', getSavedColor() || '#36e345')
   const [display, setDisplay] = useState(false)

   // update color on change
   const setClarityData = useContext(SetClarityDataContext)
   const updateColor = (color: Color) => {
      setClarityData((draft: any) => {
         const pathArr = identifier.split('.')
         let i

         for (i = 0; i < pathArr.length - 1; i++) {
            draft = draft[pathArr[i]]
         }
         draft[pathArr[i]] = color.hex
      })
   }

   // close onClick and on click outside
   const handleOpenClose = () => {
      setDisplay(!display)
   }
   const colorPickerButtonRef = useRef<HTMLDivElement>(null)
   const colorPickerRef = useRef<HTMLDivElement>(null)
   useOnClickOutside(
      () => {
         setDisplay(false)
      },
      colorPickerButtonRef,
      colorPickerRef
   )

   return (
      <div className={styles.colorPicker}>
         <div
            className={styles.colorPreview}
            style={{ backgroundColor: color.hex }}
            onClick={handleOpenClose}
            ref={colorPickerButtonRef}
         ></div>
         <span>
            {` ${Math.round(color.hsv.h)}\u00B0, ${Math.round(color.hsv.s)}%, ${Math.round(color.hsv.v)}%${
               color.hsv.a ? `, ${color.hsv.a.toFixed(3)}` : ''
            }`}
         </span>
         {display ? (
            <div className={styles.colorPickerContainer} ref={colorPickerRef}>
               <ColorPicker
                  width={319}
                  height={160}
                  color={color}
                  onChange={setColor}
                  onChangeComplete={updateColor}
                  hideHEX
                  hideRGB
                  dark
                  alpha
               />
            </div>
         ) : null}
      </div>
   )
}
