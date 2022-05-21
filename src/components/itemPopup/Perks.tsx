import { PerksAndStuff, SocketTypeNames } from '@interfaces/ts/manifest/clarityManifest'
import { UsersInventorySockets, UsersInventory_Sockets_Rolled } from '@interfaces/ts/userData/clarityUser'

import { ProviderContext } from '@components/provider/DataProvider'
import styles from '@styles/itemPopup/Perks.module.scss'
import { useContext } from 'react'

// import { Description } from './Description'

export function Perks() {
   const context = useContext(ProviderContext)

   const plugSet = context.manifest.plugSet

   const activePerks = context.clickedItem?.unique?.sockets.active
   const rolledPerks = context.clickedItem?.unique?.sockets.rolled
   const curatedPerks = context.clickedItem?.static?.item.sockets

   const getRolledPerks = (perksArr: undefined | UsersInventory_Sockets_Rolled[]) => {
      // const perksArr = rolledPerks?.[2]
      if (!perksArr) return null

      return perksArr.map((perk) => context.manifest.perksAndStuff[perk.plugItemHash])
   }

   const sockets = activePerks?.reduce((acc, socket, index) => {
      const perk = socket.plugHash ? context.manifest.perksAndStuff[socket.plugHash] : null
      if (!perk) return acc


      





      const rolled = rolledPerks?.[index] || curatedPerks?.[index]
      const curatedHash = curatedPerks?.[index].reusablePlugSetHash

      console.log('rolled', rolledPerks?.[index])
      console.log('curated', curatedHash ? plugSet[curatedHash] : null)
      console.log('active', socket.plugHash)
      console.log('-----------------------------------------------------------------')
      
      





      // const perksArr = getRolledPerks(rolledPerks?.[index])

      // acc.push({
      //    active: perk,
      //    rolled: perksArr ? perksArr : [perk]
      // })

      return acc
   }, [] as Array<{ active: PerksAndStuff; rolled: Array<PerksAndStuff> }>)

   // console.log(sockets)

   // const allPerks = []
   // for (let i = 0; i < 4; i++) {
   //    const description =
   //       i === 0
   //          ? itemData?.dataFromEditor.converted.mainEditor
   //          : i === 1
   //          ? itemData?.dataFromEditor.converted.secondaryEditor
   //          : null

   //    allPerks.push(
   //       <div className={styles.perk_list} key={i}>
   //          {description ? (
   //             <div className={styles.description}>
   //                <Description description={description} />
   //             </div>
   //          ) : null}
   //          <div className={`${styles.perk} ${styles.perk_active}`}>
   //             <div className={`${styles.icon_container} ${styles.icon_container_active}`}>
   //                <img src="https://bungie.net/common/destiny2_content/icons/f2ff6ea4498ad2d808b4af21e93cf5fe.png" />
   //             </div>
   //             <div className={`${styles.name} ${styles.name_active}`}>{itemData?.ItemData.name}</div>
   //          </div>
   //       </div>
   //    )
   // }

   // return <div className={styles.perk_box}>{allPerks}</div>

   return null
}
