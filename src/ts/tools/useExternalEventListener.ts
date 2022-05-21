import { useEffect, useState } from 'react'

/**
 * Outside react event listener
 * @param {string} targetName querySelector target
 * @param {string} eventType addEventListener event type
 * @returns event
 */
export function useExternalEventListener(targetName: string, eventType: keyof HTMLElementEventMap) {
   const [externalEvent, setExternalEvent] = useState<Event | null>(null)
   useEffect(
      () => document.querySelector(targetName)?.addEventListener(eventType, (e) => setExternalEvent(e)),
      [externalEvent]
   )
   return externalEvent
}
