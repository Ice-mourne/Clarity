export interface BungieManifest {
   DestinyBreakerTypeDefinition: { [key: string]: BungieBreakerType }
   DestinyCollectibleDefinition: { [key: string]: BungieCollectible }
   DestinyDamageTypeDefinition: { [key: string]: BungieDamageType }
   DestinyInventoryBucketDefinition: { [key: string]: BungieInventoryBucket }
   DestinyInventoryItemDefinition: { [key: string]: BungieInventoryItem }
   DestinyMaterialRequirementSetDefinition: { [key: string]: BungieMaterialRequirementSet }
   DestinyObjectiveDefinition: { [key: string]: BungieObjective }
   DestinyPlugSetDefinition: { [key: string]: BungiePlugSet }
   DestinyPowerCapDefinition: { [key: string]: BungiePowerCap }
   DestinySocketCategoryDefinition: { [key: string]: BungieSocketCategory }
   DestinySocketTypeDefinition: { [key: string]: BungieSocketType }
   DestinyStatDefinition: { [key: string]: BungieStat }
   DestinyStatGroupDefinition: { [key: string]: BungieStatGroup }
}

interface BungieBreakerType {
   blacklisted: boolean,
   displayProperties: {
      description: string
      hasIcon: boolean,
      icon: string
      name: string
   },
   enumValue: number,
   hash: number
   index: number
   redacted: boolean
   unlockHash: number
}

interface BungieCollectible {
   acquisitionInfo?: {
      acquireMaterialRequirementHash?: number,
      runOnlyAcquisitionRewardSite: boolean
   },
   blacklisted: boolean,
   displayProperties: {
      description: string
      hasIcon: boolean,
      highResIcon?: string,
      icon?: string,
      iconSequences?: Array<{
         frames: string[]
      }>
      name: string
   },
   hash: number,
   index: number,
   itemHash: number,
   parentNodeHashes?: number[],
   presentationNodeType: number
   redacted: boolean,
   scope: number,
   sourceHash?: number,
   sourceString?: string,
   stateInfo?: {
      requirements: {
         entitlementUnavailableMessage: string
      }
   },
   traitHashes?: any[],
   traitIds?: any[]
}

interface BungieDamageType {
   blacklisted: boolean,
   displayProperties: {
      description: string
      hasIcon: boolean,
      icon?: string,
      name: string
   },
   enumValue: number,
   hash: number,
   index: number,
   redacted: boolean,
   showIcon: boolean,
   transparentIconPath?: string
}

interface BungieInventoryBucket {
   blacklisted: boolean,
   bucketOrder: number,
   category: number
   displayProperties: {
      description?: string
      hasIcon: boolean,
      name?: string
   },
   enabled: boolean,
   fifo: boolean,
   hasTransferDestination: boolean
   hash: number,
   index: number,
   itemCount: number,
   location: number,
   redacted: boolean
   scope: number
}

// -------------------------------------------------- INVENTORY ITEM ----------------------------------------------------
export interface BungieInventoryItem {
   acquireRewardSiteHash: number,
   acquireUnlockHash: number,
   action?: {
      actionTypeLabel?: string,
      consumeEntireStack: boolean,
      deleteOnAction: boolean,
      isPositive: boolean,
      progressionRewards: Array<{
         amount: number,
         applyThrottles: boolean,
         progressionMappingHash: number
      }>,
      requiredCooldownHash: number,
      requiredCooldownSeconds: number,
      requiredItems: Array<{
         count: number
         deleteOnAction: boolean,
         itemHash: number
      }>,
      rewardItemHash: number
      rewardSheetHash: number,
      rewardSiteHash: number,
      useOnAcquire: boolean,
      verbDescription: string,
      verbName: string
   },
   allowActions: boolean,
   backgroundColor?: {
      alpha: number,
      blue: number,
      colorHash: number,
      green: number,
      red: number
   },
   blacklisted: boolean,
   breakerType: number,
   breakerTypeHash?: number,
   classType: number,
   collectibleHash?: number,
   crafting?: {
      bonusPlugs: Array<{
         plugItemHash: number,
         socketTypeHash: number
      }>,
      failedRequirementStrings: string[],
      outputItemHash: number,
      requiredSocketTypeHashes: number[]
   },
   damageTypeHashes?: number[],
   damageTypes?: number[],
   defaultDamageType: number,
   defaultDamageTypeHash?: number,
   displayProperties: {
      description: string
      hasIcon: boolean,
      highResIcon?: string,
      icon?: string
      iconSequences?: Array<{
         frames: string[]
      }>
      name: string
   },
   displaySource?: string,
   doesPostmasterPullHaveSideEffects: boolean,
   equippable: boolean,
   equippingBlock?: {
      ammoType: number,
      attributes: number,
      displayStrings: string[],
      equipmentSlotTypeHash: number,
      equippingSoundHash: number,
      uniqueLabelHash: number,
      hornSoundHash: number,
      uniqueLabel?: string
   },
   flavorText?: string,
   gearset?: {
      itemList: number[],
      trackingValueMax: number
   },
   hash: number,
   iconWatermark?: string,
   iconWatermarkShelved?: string,
   redacted: boolean,
   nonTransferrable: boolean,
   investmentStats?: Array<{
      isConditionallyActive: boolean,
      statTypeHash: number,
      value: number
   }>,
   isWrapper: boolean,
   itemCategoryHashes?: number[],
   uiItemDisplayStyle?: string,
   itemType: number,
   value?: {
      itemValue: Array<{
         hasConditionalVisibility: boolean,
         itemHash: number,
         quantity: number
      }>
      valueDescription: string
   },
   plug?: {
      insertionRules: Array<{
         failureMessage: string
      }>
      plugCategoryIdentifier: string
      plugCategoryHash: number
      onActionRecreateSelf: boolean
      actionRewardSiteHash: number
      actionRewardItemOverrideHash: number
      insertionMaterialRequirementHash: number
      previewItemOverrideHash: number
      enabledMaterialRequirementHash: number
      enabledRules: Array<{
         failureMessage: string
      }>
      uiPlugLabel: string
      plugStyle: number
      plugAvailability: number
      alternateUiPlugLabel: string
      alternatePlugStyle: number
      isDummyPlug: boolean
      applyStatsToSocketOwnerItem: boolean
      energyCost?: {
         energyCost: number
         energyTypeHash: number
         energyType: number
      }
      energyCapacity?: {
         capacityValue: number
         energyTypeHash: number
         energyType: number
      }
   },
   stats?: {
      disablePrimaryStatDisplay: boolean
      hasDisplayableStats: boolean,
      primaryBaseStatHash: number,
      statGroupHash?: number,
      stats: {
         [key: string]: BungieInventoryItemStat
      }
   }
   metrics?: {
      availableMetricCategoryNodeHashes: number[]
   },
   translationBlock?: {
      arrangements: Array<{
         artArrangementHash: number,
         classHash: number
      }>,
      customDyes: Array<{
         channelHash: number
         dyeHash: number
      }>,
      lockedDyes: Array<{
         channelHash: number
         dyeHash: number
      }>
      defaultDyes: Array<{
         channelHash: number
         dyeHash: number
      }>,
      weaponPatternHash: number,
      hasGeometry: boolean
   }
   itemTypeAndTierDisplayName?: string,
   sockets?: {
      detail: string
      intrinsicSockets: Array<{
         defaultVisible: boolean,
         plugItemHash: number,
         socketTypeHash: number
      }>,
      socketCategories: Array<{
         socketCategoryHash: number
         socketIndexes: number[]
      }>,
      socketEntries: Array<BungieInvItemSocketEntry>
   }
   talentGrid?: {
      buildName?: string,
      hudDamageType: number,
      hudIcon?: string,
      talentGridHash: number,
      itemDetailString: string,
   }
   preview?: {
      artifactHash?: number,
      derivedItemCategories?: Array<{
         categoryDescription: string
         categoryIndex: number,
         items: Array<{
            itemHash: number
            vendorItemIndex: number
         }>
      }>,
      previewActionString: string
      previewVendorHash: number,
      screenStyle: string
   },
   quality?: {
      currentVersion: number,
      displayVersionWatermarkIcons: string[],
      infusionCategoryHash: number,
      infusionCategoryName: string,
      infusionCategoryHashes: number[]
      itemLevels: any[],
      progressionLevelRequirementHash: number,
      qualityLevel: number,
      versions: Array<{
         powerCapHash: number
      }>
   },
   secondaryIcon?: string,
   sack?: {
      detailAction: string
      openAction: string
      openOnAcquire: boolean,
      resolvedBitVectorUnlockValueHash: number
      resolvedItemCountUnlockValueHash: number
      rewardItemListHash: number,
      rollStateUnlockValueHash: number
      seedUnlockValueHash: number,
      selectItemCount: number,
      vendorSackType?: string
   },
   screenshot?: string,
   seasonHash?: number,
   index: number,
   secondaryOverlay?: string,
   specialItemType: number,
   setData?: {
      abandonmentUnlockHash: number,
      itemList: Array<{
         itemHash: number,
         trackingValue: number
      }>,
      questLineDescription: string,
      questLineName: string,
      questStepSummary: string,
      requireOrderedSetItemAdd: boolean,
      setType: string,
      trackingUnlockValueHash: number,
      setIsFeatured: boolean,
   },
   loreHash?: number
   inventory: {
      bucketTypeHash: number,
      maxStackSize: number,
      recoveryBucketTypeHash: number
      tierTypeHash: number
      isInstanceItem: boolean
      nonTransferrableOriginal: boolean
      tierTypeName?: string
      suppressExpirationWhenObjectivesComplete: boolean,
      expirationTooltip?: string
      expiredInActivityMessage?: string
      expiredInOrbitMessage?: string
      tierType: number,
      stackUniqueLabel?: string
      recipeItemHash?: number
   },
   objectives?: {
      completionRewardSiteHash: number,
      displayActivityHashes: number[]
      displayAsStatTracker: boolean,
      inhibitCompletionUnlockValueHash: number,
      isGlobalObjectiveItem: boolean,
      narrative: string,
      nextQuestStepRewardSiteHash: number,
      questTypeHash: number
      objectiveHashes: number[],
      questTypeIdentifier: string,
      timestampUnlockValueHash: number
      objectiveVerbName: string,
      questlineItemHash: number,
      useOnObjectiveCompletion: boolean,
      perObjectiveDisplayProperties: Array<{
         activityHash?: number,
         displayOnItemPreviewScreen: boolean
      }>
      requireFullObjectiveCompletion: boolean,
   }
   summary?: {
      sortPriority: number
   },
   summaryItemHash?: number,
   itemSubType: number,
   secondarySpecial?: string
   tooltipStyle?: string,
   traitHashes?: number[],
   traitIds?: string[],
   perks?: Array<{
      perkHash: number,
      requirementDisplayString: string,
      perkVisibility: number
   }>,
   tooltipNotifications?: Array<{
      displayString: string
      displayStyle: string
   }>,
   itemTypeDisplayName?: string,
}

export interface BungieInvItemSocketEntry {
   defaultVisible: boolean,
   hidePerksInItemTooltip: boolean,
   overridesUiAppearance: boolean,
   plugSources: number,
   preventInitializationOnVendorPurchase: boolean,
   preventInitializationWhenVersioning: boolean,
   randomizedPlugSetHash?: number,
   reusablePlugItems: Array<{
      plugItemHash: number
   }>,
   reusablePlugSetHash?: number,
   singleInitialItemHash: number,
   socketTypeHash: number
}

export interface BungieInventoryItemStat {
   displayMaximum?: number,
   maximum: number,
   minimum: number
   statHash: number,
   value: number
}
// ? ------------------------------------------------ INVENTORY ITEM ----------------------------------------------------
/*
//----------------------------------------------- INVENTORY ITEM ARMOR -------------------------------------------------
export interface B_InventoryItem_Armor extends B_InventoryItem {
   sockets: {
      socketEntries: BungieInventoryItemArmor_socketEntries[]
   }
}
export interface BungieInventoryItemArmor_socketEntries {
   socketTypeHash: number
   singleInitialItemHash: number
   reusablePlugItems: Array<{
      plugItemHash: number
   }>
   reusablePlugSetHash?: number
   defaultVisible: boolean
   randomizedPlugSetHash?: number
}

//----------------------------------------------- INVENTORY ITEM WEAPON ------------------------------------------------
export interface B_InventoryItem_Weapon extends B_InventoryItem {
   stats: {
      statGroupHash: number
      stats: {
         [key: string]: BungieInventoryItemWeapon_stats
      }
   }
   sockets: {
      socketEntries: BungieInventoryItemWeapon_socketEntries[]
   }
   defaultDamageTypeHash: number
}
export interface BungieInventoryItemWeapon_stats {
   statHash: number
   value: number
}
export interface BungieInventoryItemWeapon_socketEntries {
   socketTypeHash: number
   singleInitialItemHash: number
   reusablePlugItems: Array<{
      plugItemHash: number
   }>
   reusablePlugSetHash?: number
   defaultVisible: boolean
   randomizedPlugSetHash?: number
}

//----------------------------------------------------------------------------------------------------------------------
//? ----------------------------------------------- CONVERTED STUFF END ------------------------------------------------
*/

interface BungieMaterialRequirementSet {
   blacklisted: boolean,
   hash: number
   index: number
   materials: Array<{
      count: number,
      countIsConstant: boolean,
      deleteOnAction: boolean,
      itemHash: number,
      omitFromRequirements: boolean
   }>,
   redacted: boolean
}

interface BungieObjective {
   allowNegativeValue: boolean,
   allowOvercompletion: boolean,
   allowValueChangeWhenCompleted: boolean,
   blacklisted: boolean,
   completedValueStyle: number,
   completionValue: number,
   displayProperties: {
      description: string
      hasIcon: boolean,
      icon?: string,
      iconSequences?: Array<{
         frames: string[]
      }>,
      name: string
   },
   hash: number,
   inProgressValueStyle: number,
   index: number,
   isCountingDownward: boolean,
   isDisplayOnlyObjective: boolean,
   locationHash: number,
   minimumVisibilityThreshold: number,
   perks: {
      perkHash: number
      style: number
   },
   progressDescription: string,
   redacted: boolean,
   scope: number,
   showValueOnComplete: boolean,
   stats: {
      style: number
   },
   uiLabel: string,
   uiStyle: number,
   unlockValueHash: number,
   valueStyle: number
}

interface BungiePlugSet {
   blacklisted: boolean,
   displayProperties?: {
      description: string
      hasIcon: boolean,
      highResIcon?: string,
      icon?: string
      name: string
   },
   hash: number
   index: number
   isFakePlugSet: boolean,
   redacted: boolean,
   reusablePlugItems?: Array<{
      alternateWeight: number,
      craftingRequirements?: {
         materialRequirementHashes: number[],
         requiredLevel?: number,
         unlockRequirements: {
            failureDescription: string
         }
      },
      currentlyCanRoll: boolean
      plugItemHash: number
      weight: number
   }>
}

interface BungiePowerCap {
   blacklisted: boolean,
   hash: number
   index: number
   powerCap: number,
   redacted: boolean
}

interface BungieSocketCategory {
   blacklisted: boolean,
   categoryStyle: number,
   displayProperties: {
      description: string
      hasIcon: boolean,
      name: string
   },
   hash: number
   index: number
   redacted: boolean
   uiCategoryStyle: number
}

// --------------------------------------------------- SOCKET TYPE ------------------------------------------------------
interface BungieSocketType {
   alwaysRandomizeSockets: boolean,
   avoidDuplicatesOnInitialization: boolean,
   blacklisted: boolean,
   currencyScalars: Array<{
      currencyItemHash: number
      scalarValue: number
   }>,
   displayProperties: {
      description: string
      hasIcon: boolean,
      name: string
   },
   hash: number,
   hideDuplicateReusablePlugs: boolean,
   index: number,
   insertAction: {
      actionExecuteSeconds: number
      actionSoundHash: number
      actionType: number,
      isPositiveAction: boolean
   },
   isPreviewEnabled: boolean,
   overridesUiAppearance: boolean,
   plugWhitelist: Array<B_SocketType_PlugWhitelist>,
   redacted: boolean,
   socketCategoryHash: number,
   visibility: number
}
export interface B_SocketType_PlugWhitelist {
   categoryHash: number
   categoryIdentifier: string
   reinitializationPossiblePlugHashes?: number[]
}
// ? ------------------------------------------------- SOCKET TYPE ------------------------------------------------------

export interface BungieStat {
   aggregationType: number,
   blacklisted: boolean,
   displayProperties: {
      description: string
      hasIcon: boolean,
      icon?: string
      iconSequences?: Array<{
         frames: string[]
      }>
      name: string
   },
   hasComputedBlock: boolean,
   hash: number,
   index: number,
   interpolate: boolean,
   redacted: boolean
   statCategory: number
}

export interface BungieStatGroup {
   blacklisted: boolean,
   hash: number,
   index: number,
   maximumValue: number,
   overrides: object,
   redacted: boolean,
   scaledStats: Array<{
      displayAsNumeric: boolean,
      displayInterpolation: Array<{
         value: number
         weight: number
      }>,
      maximumValue: number,
      statHash: number
   }>,
   uiPosition: number
}

// ----------------------------------------------------------------------------------------------------------------------

export interface BungieManifestInfo {
   ErrorCode: number,
   ErrorStatus: string,
   Message: string,
   MessageData: object,
   Response: {
      iconImagePyramidInfo: unknown[],
      jsonWorldComponentContentPaths: {
         'de': { [key: string]: string },
         'en': { [key: string]: string },
         'es': { [key: string]: string }
         'es-mx': { [key: string]: string }
         'fr': { [key: string]: string },
         'it': { [key: string]: string }
         'ja': { [key: string]: string }
         'ko': { [key: string]: string },
         'pl': { [key: string]: string },
         'pt-br': { [key: string]: string },
         'ru': { [key: string]: string },
         'zh-chs': { [key: string]: string },
         'zh-cht': { [key: string]: string }
      },
      jsonWorldContentPaths: {
         'de': string,
         'en': string,
         'es': string
         'es-mx': string
         'fr': string,
         'it': string
         'ja': string
         'ko': string,
         'pl': string,
         'pt-br': string,
         'ru': string,
         'zh-chs': string,
         'zh-cht': string
      },
      mobileAssetContentPath: string,
      mobileClanBannerDatabasePath: string,
      mobileGearAssetDataBases: Array<{
         path: string,
         version: number
      }>,
      mobileGearCDN: {
         Gear: string,
         Geometry: string,
         PlateRegion: string
         Shader: string,
         Texture: string
      },
      mobileWorldContentPaths: {
         'de': string,
         'en': string,
         'es': string
         'es-mx': string
         'fr': string,
         'it': string
         'ja': string
         'ko': string,
         'pl': string,
         'pt-br': string,
         'ru': string,
         'zh-chs': string,
         'zh-cht': string
      },
      version: string
   },
   ThrottleSeconds: number
}
