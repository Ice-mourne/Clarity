import { ClarityData, Themes } from '@interfaces/globalData.interface'

export function saveSettings(data: { clarityData?: ClarityData; themes?: Themes }): void {
   const settingsString = localStorage.getItem('claritySettings')
   const settings = JSON.parse(settingsString || '{}')

   if (data.clarityData) {
      localStorage.setItem(
         'claritySettings',
         JSON.stringify({
            ...settings,
            locations: data.clarityData.locations,
            dimVersion: data.clarityData.dimVersion
         })
      )
   }
   if (data.themes) {
      localStorage.setItem(
         'claritySettings',
         JSON.stringify({
            ...settings,
            theme: data.themes
         })
      )
   }
}
