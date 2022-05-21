import { useEffect, useState } from 'react'

type PresetName = 'currentUser' | 'userInfo' | 'authorization' | 'tokenRefresh'
type User = {
   membershipId: string
   membershipType: number
   access_token: string
   refresh_token: string
}
interface PresetInfo {
   url: string
   info: RequestInit
}

const getPreset = (preset: PresetName, user?: User): PresetInfo => {
   const nr = window.location.host.startsWith('beta')
      ? {
           k: 'Y2RhN2I2ZTRmYzlmNDlhZGE0ZmVkNjE4ZTExODQxYWI=',
           s: 'MzcwNzQ6eHhYUU1zMjl1OTBBcnpCVi50U2J1MU1Bei01Z1ZoeXdPSmNET3NNWjdjaw=='
        }
      : {
           k: 'N2I4ZWExNGM0MjZjNGE1MDg1M2MyM2JjZTJkZDU1ZGE=',
           s: 'MzcyOTA6LTA4RnV3RWJ1Wk1TSU03bElvSWNoeVl2bHJkSXpWVlFQMUdUbWk4OVBIcw=='
        }

   switch (preset) {
      case 'currentUser':
         return {
            url: `https://www.bungie.net/Platform/Destiny2/254/Profile/${user?.membershipId}/LinkedProfiles/?getAllMemberships=true`,
            info: {
               method: 'GET',
               mode: 'cors' as const,
               headers: {
                  'X-API-Key': atob(nr.k),
                  'authorization': user?.access_token || '',
                  'Content-Type': 'application/x-www-form-urlencoded'
               }
            }
         }
      case 'userInfo':
         return {
            url: `https://www.bungie.net/Platform/Destiny2/${user?.membershipType}/Profile/${user?.membershipId}/?components=100,102,103,200,201,202,205,300,301,305,306,307,800,308,310,309,900,1100,1200`,
            info: {
               method: 'GET',
               mode: 'cors' as const,
               headers: {
                  'X-API-Key': atob(nr.k),
                  'authorization': `Bearer ${user?.access_token}`,
                  'Content-Type': 'application/x-www-form-urlencoded'
               }
            }
         }
      case 'authorization':
         return {
            url: `https://www.bungie.net/Platform/App/OAuth/Token/`,
            info: {
               method: 'POST',
               mode: 'cors' as const,
               headers: {
                  'X-API-Key': atob(nr.k),
                  'authorization': `Basic ${nr.s}`,
                  'Content-Type': 'application/x-www-form-urlencoded'
               },
               body: `grant_type=refresh_token&refresh_token=${user?.refresh_token}`
            }
         }
      case 'tokenRefresh':
         return {
            url: `https://www.bungie.net/Platform/App/OAuth/Token/`,
            info: {
               method: 'POST',
               mode: 'cors' as const,
               headers: {
                  'X-API-Key': atob(nr.k),
                  'authorization': `Basic ${nr.s}`,
                  'Content-Type': 'application/x-www-form-urlencoded'
               },
               body: `grant_type=refresh_token&refresh_token=${user?.refresh_token}`
            }
         }
      default:
         return {
            url: '',
            info: {}
         }
   }
}

export default function useFetchWithPresets(preset: PresetName, user: User) {
   const [response, setResponse] = useState(null as unknown)
   const [complete, setComplete] = useState(false)
   const [error, setError] = useState<null | { status: number; statusText: string; preset: PresetName }>(null)

   const { url, info } = getPreset(preset, user)

   useEffect(() => {
      fetch(url, info)
         .then((resp) => {
            if (!resp.ok) setError({ status: resp.status, statusText: resp.statusText, preset })
            return resp.json()
         })
         .then((respJson) => setResponse(respJson.Response || respJson))
         .finally(() => setComplete(true))
   }, [preset])

   return { response, complete, error }
}
