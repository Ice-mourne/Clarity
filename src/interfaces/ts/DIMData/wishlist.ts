export interface WishlistDIM {
   lastFetched: Date,
   wishListAndInfo: {
      infos: Array<{
         description: string,
         numRolls: number,
         title: string
      }>
      source: string,
      wishListRolls: Array<{
         isExpertMode: boolean,
         isUndesirable: boolean,
         itemHash: number,
         notes?: string
         recommendedPerks: Set<number>
      }>
   }
}
