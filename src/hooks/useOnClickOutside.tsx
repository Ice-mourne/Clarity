import { MutableRefObject, useEffect } from 'react'

export default function useOnClickOutside(
   handler: Function,
   ref: MutableRefObject<any>,
   ref2?: MutableRefObject<any>,
   id?: string
) {
   useEffect(() => {
      const listener = (event: MouseEvent | TouchEvent) => {
         if (!ref.current || ref.current.contains(event.target)) return
         if (ref2 !== undefined) {
            if (!ref2.current || ref2.current.contains(event.target)) return
         }

         // @ts-ignore
         if (id !== undefined && event.target?.id === id) return

         handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
         document.removeEventListener('mousedown', listener)
         document.removeEventListener('touchstart', listener)
      }
   }, [ref, handler])
}