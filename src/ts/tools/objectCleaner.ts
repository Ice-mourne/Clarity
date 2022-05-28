/**
 ** Removes null, undefined, empty strings, empty arrays, and empty objects from nested objects and arrays.
 */
export function objectCleaner<T>(dirtyObject: T): T {
   const obj = { ...dirtyObject }
   const remover = (obj: any) => {
      for (const key in obj) {
         if (obj[key] === null || obj[key] === undefined || obj[key] === '') delete obj[key] // if value is null, undefined or empty string, delete it
         if (!obj[key] || typeof obj[key] !== 'object') continue // if value is not an object, continue
         remover(obj[key])
         if (Object.keys(obj[key]).length === 0) delete obj[key] // if object is empty, delete it
      }
      return obj
   }
   return remover(obj)
}
