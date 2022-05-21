import { ClarityMenu } from '@components/clarityMenu/ClarityMenu'
import { DataProvider } from '@components/DataProvider'
import { HeaderMenuPortal } from '@components/portals/HeaderMenuPortal'
import LogData from './LogData'
import { ThemeApplierPortal } from '@components/portals/ThemeApplierPortal'

//----------------------------------------------------------------------------------------------------------------------
export default function App() {
   return (
      <DataProvider>
         <>
            <LogData />
            <HeaderMenuPortal />
            <ThemeApplierPortal />
            <ClarityMenu />
         </>
      </DataProvider>
   )
}
