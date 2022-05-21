import { ClarityAuth } from '@interfaces/ts/userData/clarityUser'
import { fetchBungieUser } from '@ts/userData/fetchBungieUser'

export async function getUserAuth(code: string) {
   const authResp = await fetchBungieUser('authorization', { code })
   const authData = (await authResp.json()) as ClarityAuth
   const updatedAuthData = {
      ...authData,
      expiration_time: authData.expires_in * 1000 + Date.now()
   }
   localStorage.setItem('clarityAuthorization', JSON.stringify(updatedAuthData))
   return updatedAuthData
}

export async function getUserInfo(AuthData: ClarityAuth) {
   const currentUser = await fetchBungieUser('currentUser', { auth: AuthData })
   const userData = await currentUser.json()

   const profiles = userData.Response.profiles.map((profile: { [key: string]: any }, index: number) => {
      const platforms: { [key: string]: string } = {
         1: 'Xbox',
         10: 'Demon',
         2: 'Playstation',
         254: 'BungieNext',
         3: 'Steam',
         4: 'Blizzard',
         5: 'Stadia'
      }
      return {
         id: profile.membershipId,
         lastPlayed: profile.dateLastPlayed,
         name: profile.bungieGlobalDisplayName,
         nameCode: profile.bungieGlobalDisplayNameCode,
         platform: profile.membershipType,
         platformName: platforms[profile.membershipType],
         selected: index === 0
      }
   })
   localStorage.setItem('clarityUser', JSON.stringify(profiles))
   return profiles
}

export async function getRefreshedAuth(auth: ClarityAuth) {
   const refreshedAuth = await fetchBungieUser('tokenRefresh', { auth })
   const newAuthData = (await refreshedAuth.json()) as ClarityAuth
   const updatedAuthData = {
      ...newAuthData,
      expiration_time: newAuthData.expires_in * 1000 + Date.now()
   }
   localStorage.setItem('clarityAuthorization', JSON.stringify(updatedAuthData))
   return updatedAuthData
}
