import { startTransition, useContext } from 'react'

import { ThemeContext } from '@components/provider/ThemeProvider'
import { Themes } from '@interfaces/globalData.interface'
import { Updater } from 'use-immer'

export function useGetTheme() {
   const themes = useContext(ThemeContext)
   const themeName = themes.selectedTheme
   if (themeName === 'Clarity default' || themeName === 'DIM default') {
      return themes[themeName]
   }
   return themes.userThemes[themeName]
}

export function useGetThemeValue(location: Array<string>, fromDefault?: boolean, themeContext?: Themes) {
   if (fromDefault) {
      const newLocation = ['DIM default', ...location]
      const value = newLocation.reduce((acc, curr) => acc[curr], themeContext as any)
      return [value[0], value[1]] as [string | number, boolean]
   }

   const themes = useContext(ThemeContext)
   const themeName = themes.selectedTheme

   const newLocation = themeName.match(/^Clarity default|DIM default$/)
      ? [themeName, ...location]
      : ['userThemes', themeName, ...location]

   const value = newLocation.reduce((acc, curr) => acc[curr], themes as any)
   return [value[0], value[1]] as [string | number, boolean]
}

export function useUpdateTheme(
   themes: Themes,
   setTheme: Updater<Themes>,
   action: 'settings' | 'theme' | 'border',
   location: Array<string>,
   value: string | number | boolean
) {
   const themeName = themes.selectedTheme

   const defaultTheme = themeName.match(/^Clarity default|DIM default$/) ? true : false
   const newLocation = defaultTheme ? ['userThemes', 'Custom', ...location] : ['userThemes', themeName, ...location]

   if (defaultTheme) {
      setTheme((draft) => {
         draft.userThemes.Custom = draft[themeName as 'Clarity default' | 'DIM default']
         draft.selectedTheme = 'Custom'
      })
   }

   startTransition(() => {
      setTheme((draft: any) => {
         let i
         for (i = 0; i < newLocation.length - 1; i++) {
            draft = draft[newLocation[i]]
         }
         if (action === 'settings') draft[newLocation[i]][1] = value
         else if (action === 'theme') draft[newLocation[i]][0] = value
         else if (action === 'border') draft[newLocation[i]] = value
      })
   })
}

export function useResetTheme(themes: Themes, setTheme: Updater<Themes>, location: Array<string>) {
   const newLocation = ['userThemes', themes.selectedTheme, ...location]
   const oldValue = useGetThemeValue(location, true, themes)
   setTheme((draft: any) => {
      let i
      for (i = 0; i < newLocation.length - 1; i++) {
         draft = draft[newLocation[i]]
      }

      draft[newLocation[i]] = oldValue
   })
}
