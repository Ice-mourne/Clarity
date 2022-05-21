import { ClarityDataContext } from '@components/DataProvider'
import { useContext } from 'react'

export default function LogData() {
   const clarityData_ = useContext(ClarityDataContext)

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
            cursor: 'pointer'
         }}
         onClick={() => console.log(clarityData_)}
      >
         Log Clarity Data
      </div>
   )

   return logElement
}
