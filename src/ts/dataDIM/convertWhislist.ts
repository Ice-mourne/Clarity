// import { WishlistDIM } from '@interfaces/ts/DIMData/wishlist'
// import indexStorage from '@tools/indexedDB'

// export default async function convertWishlist () {
//    const wishlistObj = (await indexStorage('wishlistDIM', 'get')) as WishlistDIM

//    // first we group wishlists by weapon
//    const wishlist = wishlistObj.wishListAndInfo.wishListRolls.reduce(
//       (acc, cur) => {
//          acc[cur.itemHash] = [
//             ...(acc[cur.itemHash] || []),
//             {
//                isUndesirable: cur.isUndesirable,
//                itemHash: cur.itemHash,
//                notes: cur.notes,
//                perks: cur.recommendedPerks
//             }
//          ]
//          return acc
//       },
//       {} as {
//          [key: string]: Array<{
//             isUndesirable: boolean,
//             itemHash: number,
//             notes?: string
//             perks: Set<number>
//          }>
//       }
//    )

//    const template = [
//       new Set([100, 200, 300, 400]),
//       new Set([100, 200, 300, 400]),
//       new Set([100, 200, 300, 450]),
//       new Set([100, 200, 300, 450])
//    ]

//    console.log(123)

//    template.reduce((acc, cur, i, arr) => {
//       const values = cur.values()
//       debugger
//       const val1 = values.next()?.value
//       const val2 = values.next()?.value
//       const val3 = values.next()?.value
//       const val4 = values.next()?.value
//       // const val5 = values.next()?.value

//       // console.log(val1, val2, val3, val4, val5)

//       const testSet = new Set<any>(null)

//       arr.forEach((item) => {
//          const curSet = item

//          const a1 = val1 ? curSet.has(val1) : 'no'
//          const a2 = val2 ? curSet.has(val2) : 'no'
//          const a3 = val3 ? curSet.has(val3) : 'no'
//          // val4 ? curSet.has(val4) : 'no'
//          // val5 ? curSet.has(val5) : 'no'

//          if (cur.size !== curSet.size) return

//          if (a1 === 'no' || a2 === 'no' || a3 === 'no') return

//          testSet.add(val1)
//          testSet.add(val2)
//          testSet.add(val3)
//       })

//       console.log(testSet)

//       const x = `
//          c r d s
//          h r d s
//          c r d e
//          h r d e

//          dose every c have all unique values in col 2 if yes
//          dose every r have all unique values in col 3 if yes
//          dose every d have all unique values in col 3 if yes
//          compress
//       `

//       console.log(cur)
//       return acc
//    }, {} as any)
// }

export const notUsed = ''
