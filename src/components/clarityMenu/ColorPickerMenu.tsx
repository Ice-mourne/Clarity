import 'react-color-palette/lib/css/styles.css'

import { Color, ColorPicker, toColor, useColor } from 'react-color-palette'
import { SetThemeContext, ThemeContext } from '@components/provider/ThemeProvider'
import { useContext, useRef, useState } from 'react'
import { useGetThemeValue, useResetTheme, useUpdateTheme } from '@hooks/useGetUpdateTheme'

import styles from '@styles/ClarityMenu/ColorPickerMenu.module.scss'
import useOnClickOutside from '@hooks/useOnClickOutside'

export default function ColorPickerMenu({ location }: { location: Array<string> }) {
   const themes = useContext(ThemeContext)
   const setTheme = useContext(SetThemeContext)

   const [currentColor, currentStatus] = useGetThemeValue(location) as [string, boolean]

   const [color, setColor] = useColor('hex', currentColor || '#36e345')
   const [display, setDisplay] = useState(false)

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

   const changeStatus = () => useUpdateTheme(themes, setTheme, 'settings', location, !currentStatus)
   const changeColor = (color: Color) => useUpdateTheme(themes, setTheme, 'theme', location, color.hex)
   const resetColor = () => useResetTheme(themes, setTheme, location)

   return (
      <>
         <div className={styles.colorPicker}>
            <div
               className={styles.colorPreview}
               style={{ backgroundColor: currentColor }}
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
                     onChangeComplete={changeColor}
                     hideHEX
                     hideRGB
                     dark
                     alpha
                  />
               </div>
            ) : null}
         </div>

         <button onClick={resetColor}>Reset</button>
         <button onClick={changeStatus}>{`${currentStatus ? 'Disable' : 'Enable'}`}</button>
      </>
   )
}
