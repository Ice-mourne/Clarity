import { PerksAndStuff, SocketTypeNames } from '@interfaces/ts/manifest/clarityManifest'

import { ProviderContext } from '@components/provider/DataProvider'
import styles from '@styles/itemPopup/mods.module.scss'
import { useContext } from 'react'

export function Mods() {
   const context = useContext(ProviderContext)

   const perksAdnMods = context.clickedItem?.unique?.sockets.active.reduce((acc, socket) => {
      const perkHash = socket.plugHash
      if (!perkHash) return acc

      const perk = context.manifest.perksAndStuff[perkHash]
      if (!perk || !perk.displayProperties) return acc

      acc[perk.itemType] = perk

      return acc
   }, {} as { [key in SocketTypeNames]: PerksAndStuff })

   if (!perksAdnMods) return null

   const mods = Object.entries(perksAdnMods).flatMap(([type, perk], i) => {
      if (!type.match(/shaders|cosmetics|mods|masterworks|catalysts/)) return []
      return (
         <div className={styles.socket} key={i}>
            <img src={perk.displayProperties.icon} />
            {perk.iconWatermark ? <img src={perk.iconWatermark} className={styles.watermark} /> : null}
         </div>
      )
   })

   return (
      <div className={styles.container}>
         <div className={styles.intrinsic}>
            <div>
               <img src={perksAdnMods.intrinsics.displayProperties.icon} />
            </div>
            <div>
               <div>{perksAdnMods.intrinsics.displayProperties.name}</div>
               <div></div>
            </div>
         </div>
         <div className={styles.mods}>{mods}</div>
      </div>
   )
}
