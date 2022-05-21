export interface BungieUserData {
   ErrorCode: number,
   ErrorStatus: string,
   Message: string,
   MessageData: MessageData,
   Response: Response,
   ThrottleSeconds: number
}

export interface MessageData {}

export interface Response {
   characterCollectibles: CharacterCollectibles,
   characterEquipment: Character,
   characterInventories: Character,
   characterPlugSets: CharacterPlugSets,
   characterProgressions: CharacterProgressions,
   characterRecords: CharacterRecords,
   characterStringVariables: CharacterStringVariables,
   characterUninstancedItemComponents: { [key: string]: CharacterUninstancedItemComponent },
   characters: Characters
   itemComponents: ItemComponents,
   metrics: Metrics,
   profile: Profile,
   profileCollectibles: ProfileCollectibles,
   profileCurrencies: ProfileCurrenciesClass,
   profileInventory: ProfileCurrenciesClass,
   profilePlugSets: ProfilePlugSets,
   profileRecords: ProfileRecords,
   profileStringVariables: ProfileStringVariables
}

export interface CharacterCollectibles {
   data: { [key: string]: CharacterCollectiblesDatum }
   privacy: number
}

export interface CharacterCollectiblesDatum {
   collectibles: { [key: string]: Collectible }
   collectionBadgesRootNodeHash: number,
   collectionCategoriesRootNodeHash: number
}

export interface Collectible {
   state: number
}

export interface Character {
   data: { [key: string]: CharacterEquipmentData }
   privacy: number
}

export interface CharacterEquipmentData {
   items: DataItem[]
}

export interface DataItem {
   bindStatus: number,
   bucketHash: number,
   dismantlePermission: number,
   isWrapper: boolean,
   itemHash: number,
   itemInstanceId?: string,
   itemValueVisibility?: boolean[],
   location: number,
   lockable: boolean,
   overrideStyleItemHash?: number,
   quantity: number,
   state: number,
   tooltipNotificationIndexes: number[],
   transferStatus: number,
   versionNumber?: number
}

export interface CharacterPlugSets {
   data: { [key: string]: CharacterPlugSetsDatum }
   privacy: number
}

export interface CharacterPlugSetsDatum {
   plugs: { [key: string]: DatumElement[] }
}

export interface DatumElement {
   canInsert: boolean,
   enabled: boolean,
   insertFailIndexes?: number[],
   plugItemHash: number
}

export interface CharacterProgressions {
   data: { [key: string]: CharacterProgressionsDatum }
   privacy: number
}

export interface CharacterProgressionsDatum {
   checklists: { [key: string]: { [key: string]: boolean } },
   factions: { [key: string]: Ion }
   milestones: { [key: string]: Milestone }
   progressions: { [key: string]: Ion },
   quests: any[],
   seasonalArtifact: SeasonalArtifact,
   uninstancedItemObjectives: { [key: string]: ObjectiveProgress[] },
   uninstancedItemPerks: MessageData
}

export interface Ion {
   currentProgress: number,
   currentResetCount?: number,
   dailyLimit: number,
   dailyProgress: number
   factionHash?: number,
   factionVendorIndex?: number,
   level: number,
   levelCap: number,
   nextLevelAt: number,
   progressToNextLevel: number,
   progressionHash: number,
   rewardItemStates?: number[],
   stepIndex: number,
   weeklyLimit: number,
   weeklyProgress: number
}

export interface Milestone {
   activities?: Activity[],
   availableQuests?: AvailableQuest[]
   endDate?: Date,
   milestoneHash: number,
   order: number,
   rewards?: Reward[]
   startDate?: Date
   vendors?: Vendor[]
}

export interface Activity {
   activityHash: number
   booleanActivityOptions?: { [key: string]: boolean },
   challenges: Challenge[],
   modifierHashes?: number[]
   phases?: Phase[]
}

export interface Challenge {
   objective: ObjectiveProgress
}

export interface ObjectiveProgress {
   activityHash?: number,
   complete: boolean,
   completionValue: number
   destinationHash?: number,
   objectiveHash: number,
   progress: number,
   visible: boolean
}

export interface Phase {
   complete: boolean
   phaseHash: number
}

export interface AvailableQuest {
   questItemHash: number
   status: Status
}

export interface Status {
   completed: boolean,
   itemInstanceId: string,
   questHash: number,
   redeemed: boolean,
   started: boolean,
   stepHash: number,
   stepObjectives: ObjectiveProgress[],
   tracked: boolean
}

export interface Reward {
   entries: Entry[],
   rewardCategoryHash: number
}

export interface Entry {
   earned: boolean,
   redeemed: boolean,
   rewardEntryHash: number
}

export interface Vendor {
   vendorHash: number
}

export interface SeasonalArtifact {
   artifactHash: number
   pointsUsed: number
   resetCount: number
   tiers: Tier[]
}

export interface Tier {
   isUnlocked: boolean,
   items: TierItem[],
   pointsToUnlock: number
   tierHash: number
}

export interface TierItem {
   isActive: boolean,
   itemHash: number
}

export interface CharacterRecords {
   data: { [key: string]: CharacterRecordsDatum }
   privacy: number
}

export interface CharacterRecordsDatum {
   featuredRecordHashes: number[]
   recordCategoriesRootNodeHash: number,
   recordSealsRootNodeHash: number,
   records: { [key: string]: DatumRecord }
}

export interface DatumRecord {
   intervalObjectives?: ObjectiveProgress[],
   intervalsRedeemedCount: number,
   objectives?: ObjectiveProgress[],
   rewardVisibilty?: boolean[]
   state: number
}

export interface CharacterStringVariables {
   data: { [key: string]: CharacterStringVariablesData }
   privacy: number
}

export interface CharacterStringVariablesData {
   integerValuesByHash: { [key: string]: number }
}

export interface CharacterUninstancedItemComponent {
   objectives: Objectives
}

export interface Objectives {
   data: { [key: string]: ObjectivesDatum }
   privacy: number
}

export interface ObjectivesDatum {
   objectives: ObjectiveProgress[]
}

export interface Characters {
   data: { [key: string]: CharactersDatum }
   privacy: number
}

export interface CharactersDatum {
   baseCharacterLevel: number,
   characterId: string,
   classHash: number,
   classType: number,
   dateLastPlayed: Date,
   emblemBackgroundPath: string,
   emblemColor: EmblemColor,
   emblemHash: number,
   emblemPath: string,
   genderHash: number
   genderType: number,
   levelProgression: Ion,
   light: number,
   membershipId: string,
   membershipType: number,
   minutesPlayedThisSession: string,
   minutesPlayedTotal: string,
   percentToNextLevel: number,
   raceHash: number,
   raceType: number,
   stats: { [key: string]: number }
}

export interface EmblemColor {
   alpha: number,
   blue: number,
   green: number,
   red: number
}

export interface ItemComponents {
   instances: Instances
   objectives: Objectives,
   plugObjectives: PlugObjectives,
   plugStates: PlugStates,
   reusablePlugs: CharacterPlugSets,
   sockets: Sockets,
   talentGrids: TalentGrids
}

export interface Instances {
   data: { [key: string]: InstancesDatum }
   privacy: number
}

export interface InstancesDatum {
   breakerType?: number,
   breakerTypeHash?: number,
   canEquip: boolean,
   cannotEquipReason: number,
   damageType: number,
   damageTypeHash?: number,
   energy?: Energy,
   equipRequiredLevel: number
   isEquipped: boolean,
   itemLevel: number,
   primaryStat?: PrimaryStat,
   quality: number,
   unlockHashesRequiredToEquip: number[]
}

export interface Energy {
   energyCapacity: number,
   energyType: number
   energyTypeHash: number,
   energyUnused: number,
   energyUsed: number
}

export interface PrimaryStat {
   statHash: number
   value: number
}

export interface PlugObjectives {
   data: { [key: string]: PlugObjectivesDatum }
   privacy: number
}

export interface PlugObjectivesDatum {
   objectivesPerPlug: { [key: string]: ObjectiveProgress[] }
}

export interface PlugStates {
   data: { [key: string]: DatumElement }
   privacy: number
}

export interface Sockets {
   data: { [key: string]: SocketsDatum }
   privacy: number
}

export interface SocketsDatum {
   sockets: Socket[]
}

export interface Socket {
   enableFailIndexes?: number[],
   isEnabled: boolean
   isVisible: boolean
   plugHash?: number
}

export interface TalentGrids {
   data: { [key: string]: TalentGridsDatum }
   privacy: number
}

export interface TalentGridsDatum {
   isGridComplete: boolean,
   nodes: Node[]
   talentGridHash: number
}

export interface Node {
   activationGridLevel: number,
   hidden: boolean,
   isActivated: boolean,
   materialsToUpgrade: any[],
   nodeHash: number,
   nodeIndex: number,
   progressPercent: number,
   state: number,
   stepIndex: number
}

export interface Metrics {
   data: MetricsData
   privacy: number
}

export interface MetricsData {
   metrics: { [key: string]: Metric }
   metricsRootNodeHash: number
}

export interface Metric {
   invisible: boolean
   objectiveProgress: ObjectiveProgress
}

export interface Profile {
   data: ProfileData
   privacy: number
}

export interface ProfileData {
   characterIds: string[],
   currentSeasonHash: number,
   currentSeasonRewardPowerCap: number,
   dateLastPlayed: Date,
   seasonHashes: number[]
   userInfo: UserInfo,
   versionsOwned: number
}

export interface UserInfo {
   applicableMembershipTypes: number[],
   bungieGlobalDisplayName: string,
   bungieGlobalDisplayNameCode: number,
   crossSaveOverride: number,
   displayName: string,
   isPublic: boolean,
   membershipId: string,
   membershipType: number
}

export interface ProfileCollectibles {
   data: ProfileCollectiblesData
   privacy: number
}

export interface ProfileCollectiblesData {
   collectibles: { [key: string]: Collectible },
   collectionBadgesRootNodeHash: number,
   collectionCategoriesRootNodeHash: number,
   newnessFlaggedCollectibleHashes: number[],
   recentCollectibleHashes: number[]
}

export interface ProfileCurrenciesClass {
   data: CharacterEquipmentData
   privacy: number
}

export interface ProfilePlugSets {
   data: ProfilePlugSetsData
   privacy: number
}

export interface ProfilePlugSetsData {
   plugs: { [key: string]: Plug[] }
}

export interface Plug {
   canInsert: boolean,
   enableFailIndexes?: number[],
   enabled: boolean
   insertFailIndexes?: number[],
   plugItemHash: number,
   plugObjectives?: ObjectiveProgress[]
}

export interface ProfileRecords {
   data: ProfileRecordsData
   privacy: number
}

export interface ProfileRecordsData {
   activeScore: number,
   legacyScore: number,
   lifetimeScore: number,
   recordCategoriesRootNodeHash: number,
   recordSealsRootNodeHash: number,
   records: { [key: string]: DataRecord },
   score: number
}

export interface DataRecord {
   completedCount?: number,
   intervalObjectives?: ObjectiveProgress[],
   intervalsRedeemedCount: number,
   objectives?: ObjectiveProgress[],
   rewardVisibilty?: boolean[]
   state: number
}

export interface ProfileStringVariables {
   data: CharacterStringVariablesData
   privacy: number
}
