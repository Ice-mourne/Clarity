import { BungieUserData, DataItem } from '@interfaces/ts/userData/bungieUserData'
import { ClarityAuth, ClarityUser, ItemStates, Objectives, UsersInventory } from '@interfaces/ts/userData/clarityUser'

import { ClarityManifest } from '@interfaces/ts/manifest/clarityManifest'
import asyncLocalStorage from '@tools/asyncLocalStorage'
import { fetchBungieUser } from '@ts/userData/fetchBungieUser'
import { getRefreshedAuth } from '@ts/userData/userInfoAndAuth'
import { getUserProfileDIM } from '@ts/dataDIM/getUserProfileDIM'
import { toCamelCase } from '@tools/toCamelCase'

export async function getUserInventory(manifest: ClarityManifest) {
   const clarityUser = (await asyncLocalStorage('clarityUser')) as ClarityUser[]
   let clarityAuth = (await asyncLocalStorage('clarityAuthorization')) as ClarityAuth

   // check if auth token is still valid if not refresh it
   if (clarityAuth.expiration_time && clarityAuth.expiration_time < Date.now() - 10 * 1000) {
      clarityAuth = await getRefreshedAuth(clarityAuth)
   }

   const response = await fetchBungieUser('userInfo', { user: clarityUser, auth: clarityAuth })
   if (response?.status != 200) return

   const json: BungieUserData = await response?.json()
   const userData = json.Response

   const armorWeapon = manifest.items
   const itemIds = Object.keys(armorWeapon)

   // gets all items user have in one place
   // this provides only item hash and unique id
   const items = [
      ...userData.profileInventory.data.items,
      ...Object.values(userData.characterInventories.data).flatMap((x) => x.items),
      ...Object.values(userData.characterEquipment.data).flatMap((x) => x.items)
   ]

   const getItemState = (item: DataItem) => {
      const possibleStates: { [key: string]: ItemStates[] } = {
         0: ['none'],
         1: ['locked'],
         4: ['masterwork'],
         5: ['masterwork', 'locked'],
         8: ['crafted'],
         9: ['crafted', 'locked'],
         12: ['crafted', 'masterwork'],
         13: ['crafted', 'masterwork', 'locked'],
         16: ['hasMaterials'],
         20: ['hasMaterials', 'masterwork'],
         21: ['hasMaterials', 'masterwork', 'locked']
      }
      return possibleStates[item.state]
   }

   const tagsNotes = (await getUserProfileDIM(userData.profile.data.userInfo.membershipId)).tags

   // all of progress is mess but it works and it was painful enough already
   const progress = (uniqueId: string) => {
      const objectivesPlugs = userData.itemComponents.plugObjectives.data[uniqueId]?.objectivesPerPlug
      if (!objectivesPlugs) return

      // find tracker, deep sight, or shaped weapon
      const convertedObjectives = Object.entries(objectivesPlugs).reduce((acc, [hash, value]) => {
         const manifestObjectives = manifest.perksAndStuff[hash]
         if (!manifestObjectives?.itemType?.match(/tracker|deepsight/i) || !manifestObjectives?.displayProperties.name)
            return acc

         const newName: { [key: string]: string } = {
            'Crucible Opponents Defeated': 'kills',
            'Enemies Defeated': 'kills',
            'Attunement Progress': 'progress',
            'Level Progress': 'progress',
            'Shaping Date': 'shapingDate',
            'Weapon Level': 'level'
         }

         acc[toCamelCase(manifestObjectives?.displayProperties.name) as keyof Objectives] = value.reduce(
            (acc, objective) => {
               const name = manifestObjectives.objectives?.[objective.objectiveHash].name
               if (!name) return acc

               acc[newName[name]] =
                  name === 'Shaping Date'
                     ? new Date(objective.progress * 1000).toLocaleString(undefined, {
                          dateStyle: 'medium'
                       })
                     : name === 'Level Progress' || name === 'Attunement Progress'
                     ? (objective.progress / 10).toString()
                     : objective.progress.toString()

               return acc
            },
            {} as { [key: string]: string }
         )

         return acc
      }, {} as Objectives)

      // some exotics don't have traditional pve, pvp trackers
      // this will is for them exclusively

      const missingObjectives = Object.entries(objectivesPlugs).reduce(
         (acc, [hash, value]) => {
            const objective = value.filter((value) =>
               value.objectiveHash.toString().match(/73837075|90275515|2579044636/)
            )
            if (!objective[0]) return acc

            acc.killTracker.kills = objective[0].progress.toString()

            return acc
         },
         { killTracker: { kills: '' } }
      )

      const newObjectives = { ...missingObjectives, ...convertedObjectives }
      if (Object.keys(newObjectives).length === 0) return
      return newObjectives
   }

   const sockets = (currentItem: DataItem) => {
      const itemInstanceId = currentItem.itemInstanceId
      if (!itemInstanceId) return
      const active = userData.itemComponents.sockets.data[itemInstanceId].sockets
      const rolled = userData.itemComponents.reusablePlugs.data[itemInstanceId]?.plugs


      const sockets = active.map((socket) => {
         return {
            socketType: socket.plugHash
         }
      })









      
   }

   const representation = [
      {
         socketType: '',
         rolled: [
            {
               hash: '',
               active: false,
               selected: false
            },
            {
               hash: '',
               active: true,
               selected: false
            }
         ],
         all: [
            {
               hash: '',
               active: false,
               selected: false,
               canRoll: true
            },
            {
               hash: '',
               active: false,
               selected: false,
               canRoll: true
            }
         ]
      },
      {
         socketType: '',
         rolled: [
            {
               hash: '',
               active: false,
               selected: false
            },
            {
               hash: '',
               active: true,
               selected: false
            }
         ],
         all: [
            {
               hash: '',
               active: false,
               selected: false,
               canRoll: true
            },
            {
               hash: '',
               active: false,
               selected: false,
               canRoll: true
            }
         ]
      }
   ]

   return items.reduce((acc, cur) => {
      // remove items with out unique id or items not listed in clarity manifest
      if (!cur.itemInstanceId || !itemIds.includes(cur.itemHash.toString())) return acc

      acc[cur.itemInstanceId] = {
         hash: cur.itemHash,
         itemInstanceId: cur.itemInstanceId,
         sockets: {
            active: userData.itemComponents.sockets.data[cur.itemInstanceId].sockets,
            rolled: userData.itemComponents.reusablePlugs.data[cur.itemInstanceId]?.plugs
         },
         powerLvl: userData.itemComponents.instances.data[cur.itemInstanceId].primaryStat?.value as number, // it should not be possible to not have primary stat have power lvl
         state: getItemState(cur),
         note: tagsNotes[cur.itemInstanceId]?.notes,
         progress: progress(cur.itemInstanceId)
      }
      return acc
   }, {} as { [key: string]: UsersInventory })
}
