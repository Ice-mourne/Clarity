import { LineText, Description as descriptionInterface } from 'src/interfaces_2'

import styles from '@styles/itemPopup/Description.module.scss'

const calculateStat = (formula?: string) => {
   if (formula) return `${Math.round(Math.random() * 1000)}ms`
}

const otherOptions = (options: LineText) => {
   if (options.linkUrl) return <a href={options.linkUrl}>{options.linkText}</a>
   if (options.formula || options.formulaText)
      return (
         <span>
            {options.formulaText} {calculateStat(options.formula)}
         </span>
      )
}

const joinClassNames = (classNames?: string) => {
   return classNames
      ?.split(' ')
      .map((className: string) => styles[className])
      .join(' ')
}
export function Description({ description }: { description: descriptionInterface[] }): JSX.Element {
   const descriptionLine = (line: descriptionInterface, i: number) => (
      <div className={joinClassNames(line.className)} key={i}>
         {line.lineText?.map((text, i) => (
            <span className={joinClassNames(text.className)} title={text.title} key={i}>
               {text.text || otherOptions(text)}
            </span>
         ))}
      </div>
   )

   const descriptionTable = <T extends object[]>(table: T, i: number) => (
      <div className={styles.table} key={i}>
         {table.map((line, i) => descriptionLine(line, i))}
      </div>
   )

   const completeDescription = (description: descriptionInterface[]) => {
      if (!description || Object.keys(description).length === 0) return

      return description?.map((description: descriptionInterface, i: number) =>
         description?.table ? descriptionTable(description.table, i) : descriptionLine(description, i)
      )
   }
   return <div>{completeDescription(description)}</div>
}
