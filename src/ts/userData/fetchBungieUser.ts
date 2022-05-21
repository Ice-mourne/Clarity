import { AuthType, ClarityAuth, ClarityUser } from '@interfaces/ts/userData/clarityUser'

let numberOfRetries = 0

export async function fetchBungieUser (
   authType: AuthType,
   userData: {
      auth?: ClarityAuth
      code?: string,
      user?: ClarityUser[]
   }
): Promise<Response> {
   const selectedUser = userData.user?.find(user => user.selected)
   const nr = window.location.host.startsWith('beta')
      ? {
         k: 'Y2RhN2I2ZTRmYzlmNDlhZGE0ZmVkNjE4ZTExODQxYWI=',
         s: 'MzcwNzQ6eHhYUU1zMjl1OTBBcnpCVi50U2J1MU1Bei01Z1ZoeXdPSmNET3NNWjdjaw=='
      }
      : {
         k: 'N2I4ZWExNGM0MjZjNGE1MDg1M2MyM2JjZTJkZDU1ZGE=',
         s: 'MzcyOTA6LTA4RnV3RWJ1Wk1TSU03bElvSWNoeVl2bHJkSXpWVlFQMUdUbWk4OVBIcw=='
      }

   type AuthTypeInfo = {
      [key in AuthType]: {
         authorization?: string,
         body?: string,
         link: string,
         method: 'GET' | 'POST'
      }
   }
   const info: AuthTypeInfo = {
      authorization: {
         authorization: `Basic ${nr.s}`,
         body: `grant_type=authorization_code&code=${userData.code}`,
         link: 'App/OAuth/Token/',
         method: 'POST'
      },
      currentUser: {
         link: `Destiny2/254/Profile/${userData.auth?.membership_id}/LinkedProfiles/?getAllMemberships=true`,
         method: 'GET'
      },
      tokenRefresh: {
         authorization: `Basic ${nr.s}`,
         body: `grant_type=refresh_token&refresh_token=${userData.auth?.refresh_token}`,
         link: 'App/OAuth/Token/',
         method: 'POST'
      },
      userInfo: {
         authorization: `Bearer ${userData.auth?.access_token}`,
         link: `Destiny2/${selectedUser?.platform}/Profile/${selectedUser?.id}/?components=100,102,103,200,201,202,205,300,301,305,306,307,800,308,310,309,900,1100,1200`,
         method: 'GET'
      }
   }

   const resp = await fetch(`https://www.bungie.net/Platform/${info[authType].link}`, {
      body: info[authType].body,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'X-API-Key': atob(nr.k),
         authorization: info[authType].authorization || ''
      },
      method: info[authType].method,
      mode: 'cors'
   })

   // on error, retry up to 3 times. // TODO: probably should add some delay between retries
   if (!resp.ok && numberOfRetries < 2) {
      numberOfRetries++
      return await fetchBungieUser(authType, userData)
   }

   return resp
}
