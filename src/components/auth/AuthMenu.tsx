import { ProviderContext, SetProviderContext } from '@components/provider/DataProvider'
import { getUserAuth, getUserInfo } from '@ts/userData/userInfoAndAuth'
import { useContext, useState } from 'react'

import { ClarityUser } from '@interfaces/ts/userData/clarityUser'
import logo from '@assets/logos/clarity.png'
import style from '@styles/auth/authMenu.module.scss'

export function AuthMenu() {
   const [profileList, setProfiles] = useState([] as Array<ClarityUser>)
   const [selectedProfile, setSelectedProfile] = useState(null as string | null)

   const context = useContext(ProviderContext)
   const setContext = useContext(SetProviderContext)

   const openAuthWindow = () => {
      // send message to background script to start looking for auth window
      // then it finishes closes auth window and sends code back
      chrome.runtime.sendMessage('', async (code) => {
         const userAuth = await getUserAuth(code)
         const userProfiles = await getUserInfo(userAuth)
         setProfiles(userProfiles)
         setContext((data) => ({
            ...data,
            authInfo: {
               ...data.authInfo,
               auth: userAuth
            },
            authState: {
               askForAuth: false, // close window asking to auth
               platformSelection: true // open platform selection
            }
         }))
      })

      // opens auth window
      const id = window.location.host.includes('beta') ? '37074' : '37290'
      window.open(
         `https://www.bungie.net/en/OAuth/Authorize?client_id=${id}&response_type=code&state=clarityAuth`,
         'Clarity authorizations',
         'width=700,height=800'
      )
   }

   const selectProfile = () => {
      const updatedProfiles = profileList.map((profile) => {
         // change selected profile if needed
         if (profile.platformName !== selectedProfile) return profile
         return {
            ...profile,
            selected: true
         }
      })
      localStorage.setItem('clarityUser', JSON.stringify(updatedProfiles))
      setContext((data) => ({
         ...data,
         authInfo: {
            ...data.authInfo,
            user: updatedProfiles
         },
         authState: {
            platformSelection: false, // close platform selection
            getUserData: true // open get user data // this will attempt to get user data
         }
      }))
   }

   const askForAuth = (
      <>
         <div>Allow Clarity to view and modify your Destiny characters, vault, and progression</div>
         <button className={style.button} onClick={openAuthWindow}>
            Authorize with Bungie.net
         </button>
      </>
   )

   const selectPlatform = (
      <>
         <div>Authorization Complete</div>
         <div>
            <span>Select your platform </span>
            <select
               className={style.platformSection}
               onChange={(selected) => setSelectedProfile(selected.target.value)}
            >
               {profileList.map((profile) => (
                  <option key={profile.platformName} value={profile.platformName}>
                     {profile.platformName}
                  </option>
               ))}
            </select>
         </div>
         <button className={style.button} onClick={selectProfile}>
            Confirm
         </button>
         <div>You can change it later in Clarity menu.</div>
      </>
   )

   const complete = (
      <>
         <div>Getting Character Data</div>
         <div>Loading... </div>
      </>
   )

   return (
      <div className={style.authWindow}>
         <div className={style.nameArea}>
            <img src={logo} className={style.logo} />
            <div>Clarity, A DIM Companion</div>
            <img src={logo} className={style.logo} />
         </div>

         {context.authState.askForAuth ? askForAuth : null}
         {context.authState.platformSelection ? selectPlatform : null}
         {context.authState.getUserData ? complete : null}

         <div className={style.privacyPolicy}>Privacy Policy</div>
         <div className={style.policyText}>
            <div>Last updated March 11, 2022</div>
            <div>
               Clarity, A DIM Companion, does not collect or store any user's data externally (outside of your device).
               Unless explicitly asked by the developer to improve Clarity's functionality or fix bugs.
            </div>
            <div>Clarity is unable to send data anywhere, except:</div>
            <div>
               <span> - </span>
               <a href="https://www.bungie.net/" target="_blank">
                  Bungie.net
               </a>
               <span> — </span>
               <span>
                  to authenticate player data, to ask for player data, and to execute actions on behalf of the player's
                  account;
               </span>
            </div>
            {/* <div>- google.com — for the purposes of saving settings.</div> */}
            <div>Privacy policy can change at any time without prior notice and can be checked in the Clarity menu</div>
            <div>
               <span>For any questions, you can contact me by email at clovisbreh@gmail.com or </span>
               <a href="https://discord.gg/43TPU5ehmP" target="_blank">
                  Discord
               </a>
            </div>
         </div>
      </div>
   )
}
