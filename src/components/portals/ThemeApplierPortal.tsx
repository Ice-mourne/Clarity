import ThemeApplier from '@components/clarityMenu/ThemeApplier'
import { createPortal } from 'react-dom'

export function ThemeApplierPortal() {
   const html = document.querySelector('html')

   return html ? createPortal(ThemeApplier(), html) : null
}
