export interface LineText {
   text?: string
   formulaText?: string
   formula?: string
   className?: string
   linkUrl?: string
   linkText?: string
   title?: string
}
export interface Description {
   lineText?: LineText[]
   className?: string
   isFormulaTable?: boolean
   table?: Array<{
      lineText?: LineText[]
      className?: string
   }>
}
export type SelectableType =
   | 'armorExotic'
   | 'armorMod'
   //---------
   | 'weaponPerkExotic'
   | 'weaponFrameExotic'
   | 'weaponPerk'
   | 'weaponPerkEnhanced'
   | 'weaponFrame'
   | 'weaponMod'
   | 'weaponCatalystExotic'
   //---------
   | 'ghostMod'

interface Item {
   id: number
   name: string

   itemId?: number
   itemName?: string

   type: SelectableType

   description: Array<Description>
   simpleDescription?: Array<Description>

   stats?: { [key: string]: any }

   lastUpdate: number
   updatedBy: string
}
export interface ClarityDescription {
   [key: string]: Item
}

export interface ItemWithEditor extends Item {
   editor: {
      mainEditor: string
      secondaryEditor: string
   }
   inLiveDatabase?: boolean
}
export interface ClarityDescriptionWithEditor {
   [key: string]: ItemWithEditor
}

export interface ItemData {
   id: number
   name: string
   itemId?: number
   itemName?: string
   stats?: { [key: string]: any }
   lastUpdate?: string
   updatedBy?: string
}

export interface ItemDataTemplate {
   inputData: {
      id: string
      type?: SelectableType
   }
   ItemData: ItemData
   dataFromEditor: {
      converted: {
         mainEditor: Array<Description>
         secondaryEditor?: Array<Description>
      }
      original: {
         mainEditor: string
         secondaryEditor: string
      }
   }
   dataFromGithub?: ClarityDescriptionWithEditor
   message: Array<{
      jsx: JSX.Element
      number: number
   }>

   linkedPerks?: number[]
}
