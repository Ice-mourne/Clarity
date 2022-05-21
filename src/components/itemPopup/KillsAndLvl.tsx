import { ProviderContext } from '@components/provider/DataProvider'
import styles from '@styles/itemPopup/KillsAndLvl.module.scss'
import { useContext } from 'react'

export function KillsAndLvl() {
   const context = useContext(ProviderContext)
   const progress = context.clickedItem?.unique?.progress

   const percentage = progress?.shapedWeapon?.progress || progress?.deepsightResonance?.progress
   const deepsightName = progress?.shapedWeapon ? 'Level' : 'Attunement Progress'
   const shapingDate = progress?.shapedWeapon?.shapingDate

   const objective = (
      <div className={styles.objectiveContainer}>
         <div className={styles.objectiveContent}>
            <div
               className={`${styles.progressBar} ${deepsightName === 'Level' ? styles.progressBarRed : null}`}
               style={{ width: `${percentage}%` }}
            ></div>
            <div className={styles.description}>{`${deepsightName} ${progress?.shapedWeapon?.level || ''}`}</div>
            {shapingDate ? (
               <div className={styles.description}>{`Crafted: ${progress?.shapedWeapon?.shapingDate}`}</div>
            ) : null}
            <div className={styles.description}>{`${percentage}%`}</div>
         </div>
      </div>
   )

   const pveKills = Number(progress?.killTracker?.kills)
   const pvpKills = Number(progress?.crucibleTracker?.kills)

   const tracker = (
      <div className={styles.killsContainer}>
         {pveKills ? (
            <div className={styles.killsContent}>
               <img src="https://www.bungie.net/common/destiny2_content/icons/1c0c674ed40bec52e8e0691f9020beea.png" />
               <div className={styles.killsDescription}>PvE Kills</div>
               <div className={styles.killsValue}>{new Intl.NumberFormat().format(pveKills)}</div>
            </div>
         ) : null}
         {pvpKills ? (
            <div className={styles.killsContent}>
               <img src="https://www.bungie.net/common/destiny2_content/icons/1c0c674ed40bec52e8e0691f9020beea.png" />
               <div className={styles.killsDescription}>PvP Kills</div>
               <div className={styles.killsValue}>{new Intl.NumberFormat().format(pvpKills)}</div>
            </div>
         ) : null}
      </div>
   )

   return (
      <div className="killsAndLvl">
         {percentage ? objective : null}
         {pveKills || pvpKills ? tracker : null}
      </div>
   )
}
