import court from '@assets/logos/court.png'
import ivanFKaramazov from '@assets/logos/ivanFKaramazov.png'
import pip1n from '@assets/logos/pip1n.png'
import rangeCalc from '@assets/logos/rangeCalc.png'
import sereni from '@assets/logos/sereni.png'
import spreadsheet from '@assets/logos/spreadsheet.png'
import styles from '@styles/ClarityMenu/menuContent/SpecialThanks.module.scss'

export default function SpecialThanks() {
   return (
      <>
         <title>Special thanks</title>
         <div className={styles.creators}>
            <img src={pip1n} />
            <span>Pip1n &gt; </span>
            <a
               href="https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/edit"
               target="_blank"
            >
               The Destiny Data Compendium
            </a>
         </div>
         <div className={styles.creators}>
            <img src={court} />
            <span>Court &gt; </span>
            <a
               href="https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/edit"
               target="_blank"
            >
               Damage Buffs, Debuffs, and Modifiers
            </a>
         </div>
         <div className={styles.creators}>
            <img src={rangeCalc} />
            <span>Mmonx &gt; </span>
            <a href="https://destinyindepth.com/range_calculator/" target="_blank">
               Destiny In Depth
            </a>
            <span> And </span>
            <a
               href="https://docs.google.com/spreadsheets/d/1LWsExOPoP3Ycx4p1E99aUhKQucP_VguT08TbL7sf_6U/edit#"
               target="_blank"
            >
               Weapon Range in Meters Charts
            </a>
            <span> (Outdated)</span>
         </div>
         <div className={styles.creators}>
            <img src={ivanFKaramazov} />
            <span>IvanFKaramazov &gt; </span>
            <span>Maintaining range mentally</span>
         </div>
         <div className={styles.creators}>
            <img src={spreadsheet} />
            <span>Van Holden &gt; </span>
            <a
               href="https://docs.google.com/spreadsheets/d/1h_xbE4U8JZMCfOqdwg-RqhbBYqaSERFH1wZ7wl5-E2I/edit"
               target="_blank"
            >
               Massive Breakdown of Reload
            </a>
            <span> (Outdated)</span>
         </div>
         <div className={styles.creators}>
            <img src={sereni} />
            <span>Sereni &gt; </span>
            <a
               href="https://docs.google.com/spreadsheets/d/13heG_rKRB9UU5DpvRbl1q11WGFs8QPPzpFA60uIOT8w/edit"
               target="_blank"
            >
               Reload Sheet 2: Electric Boogaloo
            </a>
            <span> (Outdated)</span>
         </div>
         <div className={styles.creators}>
            <img src={undefined} />
            <span>beenlab &gt; </span>
            <a href="https://linktr.ee/destinyspreadsheets" target="_blank">
               Aggregation of third party websites, spreadsheets, and tools for Destiny 2.
            </a>
         </div>
      </>
   )
}
