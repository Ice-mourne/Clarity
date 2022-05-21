import { Header } from './Header'
import { KillsAndLvl } from './KillsAndLvl'
import { Mods } from './Mods'
import Notes from './Notes'
import { Perks } from './Perks'
import { Stats } from './Stats'
import styles from '@styles/itemPopup/PopupBody.module.scss'

export default function ItemPopupBody() {
   return (
      <div className={styles.popupBody}>
         <Header />
         <Notes />
         <KillsAndLvl />
         <Stats />
         <Mods />
         <Perks />
      </div>
   )
}
