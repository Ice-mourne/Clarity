import { ClarityManifest, InventoryItem } from '../manifest/clarityManifest'

export type AuthType = 'authorization' | 'tokenRefresh' | 'currentUser' | 'userInfo'

export interface ClarityUser {
   id: string
   lastPlayed: Date,
   name: string,
   nameCode: number,
   platform: number,
   platformName: string,
   selected: boolean
}

export interface ClarityAuth {
   access_token: string,
   expiration_time?: number,
   expires_in: number,
   membership_id: string,
   refresh_expires_in: number,
   refresh_token: string,
   token_type: string
}

export type ItemStates = 'none' | 'locked' | 'masterwork' | 'crafted' | 'hasMaterials'
export interface UsersInventory {
   hash: number
   itemInstanceId: string
   note?: string,
   powerLvl: number
   progress?: Objectives,
   sockets: UsersInventorySockets,
   state: ItemStates[]

}

export interface UsersInventorySockets {
   active: Array<{
      enableFailIndexes?: number[],
      isEnabled: boolean
      isVisible: boolean
      plugHash?: number
   }>
   rolled?: {
      [key: string]: Array<UsersInventory_Sockets_Rolled>
   }
}

export interface UsersInventory_Sockets_Rolled {
   canInsert: boolean,
   enabled: boolean,
   insertFailIndexes?: number[],
   plugItemHash: number
}

export interface ClarityData {
   authInfo: {
      auth?: ClarityAuth
      user?: ClarityUser[]
   }
   authState: {
      askForAuth?: boolean
      getUserData?: boolean,
      haveUserData?: boolean,
      platformSelection?: boolean
   },
   clickedItem?: {
      HTMLElement?: HTMLElement
      static?: {
         hash: number
         item: InventoryItem
      }
      unique?: {
         id: string,
         note?: string,
         powerLvl: number
         progress?: Objectives,
         sockets: UsersInventorySockets,
         state: ItemStates[]
      }
   },
   manifest: ClarityManifest,
   usersInventory?: {[key: string]: UsersInventory}
}

export interface Objectives {
   crucibleTracker?: {
      kills?: string
   }
   deepsightResonance?: {
      progress?: string
   },
   killTracker?: {
      kills?: string
   },
   shapedWeapon?: {
      level?: string,
      progress?: string,
      shapingDate?: string
   }
}
