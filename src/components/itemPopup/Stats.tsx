import { ProviderContext } from '@components/provider/DataProvider_old'
import { calculateStats } from '@ts/calculations/calculateStats'
import styles from '@styles/itemPopup/stats.module.scss'
import { useContext } from 'react'

export function Stats() {
   const context = useContext(ProviderContext)

   const baseStats = calculateStats(context)

   return (
      <div className={styles.statsContainer}>
         {Object.entries(baseStats || {})?.map(([name, value]) => (
            <>
               <div className={styles.statName} key={`${name}_1`}>{name}</div>
               <div className={styles.statValue} key={`${name}_2`}>{value}</div>
               <div className={styles.statBar} key={`${name}_3`}></div>
            </>
         ))}
      </div>
   )
}
