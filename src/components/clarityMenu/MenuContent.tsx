import { CustomTheme } from './menuContent/CustomTheme'
import SpecialThanks from './menuContent/SpecialThanks'
import styles from '@styles/ClarityMenu/MenuContent.module.scss'

export function MenuContent() {
   return <div className={styles.menuContent}>
      <SpecialThanks />
      <CustomTheme />
   </div>
}
