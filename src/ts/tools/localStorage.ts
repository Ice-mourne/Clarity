interface Settings {
   darkMode: {
      enabled: boolean
      locations: {
         background: string[]
         items: {}
      }
   }
   descriptionVersion: number
   manifestVersion: string
}

// creates a new settings object and saves in localStorage if it doesn't exist
// this is needed for first startup and if deleted
function setInitialSettings(): void {
   const settings: Settings = {
      darkMode: {
         enabled: false,
         locations: {
            background: [],
            items: {}
         }
      },
      descriptionVersion: 0,
      manifestVersion: ''
   }
   localStorage.setItem('ClaritySettings', JSON.stringify(settings))
}

export function updateSettings(pathString: string, value: any): void {
   // gets to location provided for example if location provided is 'darkMode.locations.background'
   // it will go to settings > darkMode > locations > background and return value from it
   const pathArr = pathString.split('.')
   let settings = JSON.parse(localStorage.getItem('ClaritySettings') || '{}')
   let i

   for (i = 0; i < pathArr.length - 1; i++) {
      settings[pathArr[i]] = settings[pathArr[i]] || {}
      settings = settings[pathArr[i]]
   }
   settings[pathArr[i]] = value

   localStorage.setItem('ClaritySettings', JSON.stringify(settings))
}

export function getSettings(): Settings {
   const settingsString = localStorage.getItem('ClaritySettings')
   if (!settingsString) {
      setInitialSettings()
      return getSettings()
   }

   const settings = JSON.parse(settingsString as string)
   return settings
}
