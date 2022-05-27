import { ClarityMenu } from '@components/clarityMenu/ClarityMenu'
import { DataProvider } from '@components/DataProvider'
import { HeaderMenuPortal } from '@components/portals/HeaderMenuPortal'
import LogData from './LogData'
import { PopOutMenuPortal } from '@components/portals/PopOutMenuPortal'
import { ThemeApplierPortal } from '@components/portals/ThemeApplierPortal'
import { ThemeProvider } from '@components/provider/ThemeProvider'

//----------------------------------------------------------------------------------------------------------------------
export default function App() {
   return (
      <DataProvider>
         <ThemeProvider>
            <>
               <LogData />
               <HeaderMenuPortal />
               <PopOutMenuPortal />
               <ThemeApplierPortal />
               <ClarityMenu />
            </>
         </ThemeProvider>
      </DataProvider>
   )
}
