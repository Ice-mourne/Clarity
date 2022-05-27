import { SetThemeContext, ThemeContext } from '@components/provider/ThemeProvider'
import { useGetThemeValue, useUpdateTheme } from '@hooks/useGetUpdateTheme'

import { useContext } from 'react'

export default function RangeInput({ min, max, location }: { min: number; max: number; location: Array<string> }) {
   const themes = useContext(ThemeContext)
   const setTheme = useContext(SetThemeContext)
   return (
      <input
         type="range"
         min={min}
         max={max}
         value={useGetThemeValue(location)[0]}
         onChange={(e) => useUpdateTheme(themes, setTheme, 'theme', location, Number(e.target.value))}
      />
   )
}
