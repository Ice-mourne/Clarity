import { ProviderContext } from '@components/provider/DataProvider_old'
import styles from '@styles/itemPopup/header.module.scss'
import { useContext } from 'react'

export function Header() {
   const context = useContext(ProviderContext)

   const x = 'asd'

   const item = context.clickedItem?.static?.item
   const uniqueItem = context.clickedItem?.unique

   const masterwork = uniqueItem?.state.includes('masterwork')

   const left = (
      <div className={styles.left}>
         <div className={styles.type}>{item?.itemClassTypeName}</div>
         {item?.ammo ? <img className={styles.ammo} src={item.ammo.icon} /> : null}
         {item?.breakerType ? <img className={styles.breaker} src={item?.breakerType.icon} /> : null}
      </div>
   )
   const right = (
      <div className={styles.right}>
         {item?.defaultDamageType ? <img className={styles.element} src={item.defaultDamageType.icon} /> : null}
         <div className={styles.power}>{uniqueItem?.powerLvl}</div>
      </div>
   )

   const headerClassName = `
      ${styles.header}
      ${item ? styles[item?.inventory.tierTypeName] : null}
      ${masterwork ? styles[`${item?.inventory.tierTypeName}-masterwork`] : null}
   `
   return (
      <div className={headerClassName}>
         <a className={styles.name}>{item?.displayProperties.name}</a>
         <div className={styles.bottom}>
            {left}
            {right}
         </div>
      </div>
   )
}
