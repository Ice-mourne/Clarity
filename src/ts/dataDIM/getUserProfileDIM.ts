import { UserProfileDIM } from '@interfaces/ts/DIMData/userProfileDIM'
import indexStorage from '@tools/indexedDB'

export async function getUserProfileDIM(userID: string | undefined) {
   const userProfileDIM = (await indexStorage('userProfileDIM', 'get')) as UserProfileDIM

   return {
      tags: userProfileDIM.profiles[`${userID}-d2`].tags
   }
}
