import { ClarityData } from 'src/globalData.interface'
import { Updater } from 'use-immer'

export function saveSettings(clarityData: ClarityData): void {
   if (Object.keys(clarityData.locations).length === 0) return

   const settings = {
      locations: clarityData.locations,
      theme: clarityData.theme,
      dimVersion: clarityData.dimVersion
   }

   localStorage.setItem('claritySettings', JSON.stringify(settings))
}

export function loadSettings(setClarityData: Updater<ClarityData>): void {
   const settingsString = localStorage.getItem('claritySettings')
   if (!settingsString) return

   const settings = JSON.parse(settingsString)

   setClarityData((draft) => {
      if (settings.locations) draft.locations = settings.locations
      if (settings.theme) draft.theme = settings.theme
      if (settings.dimVersion) draft.dimVersion = settings.dimVersion
   })
}
