import { ClarityDataContext } from '@components/DataProvider'
import { ThemeContext } from '@components/provider/ThemeProvider'
import { useContext } from 'react'

export default function LogData() {
   const clarityData = useContext(ClarityDataContext)
   const theme = useContext(ThemeContext)

   const buttonStyle = {
      cursor: 'pointer',
      margin: '10px 0',
      padding: '5px',
   }

   const logElement = (
      <div
         style={{
            position: 'absolute',
            background: 'black',
            top: '120px',
            right: '50px',
            zIndex: '9999',
            fontSize: '20px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column'
         }}
      >
         <button onClick={() => document.dispatchEvent(new Event('inventory_ready'))} style={buttonStyle}>
            Log Clarity Data
         </button>
         <button onClick={() => console.table(theme)} style={buttonStyle}>
            Log Theme
         </button>
      </div>
   )

   return logElement
}
