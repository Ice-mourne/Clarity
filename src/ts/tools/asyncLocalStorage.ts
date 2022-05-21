/**
 ** Checks localStorage with the given key for a value
 ** Until the value is found, it will keep checking every half a second by default
 * @param key LocalStorage key
 * @param time Time to wait between checks
 * @returns Promise with value from localStorage
 */
export default async function asyncLocalStorage (key: string, time: number = 50) {
   const data: Promise<string> = new Promise((resolve, reject) => {
      const interval = setInterval(() => {
         if (!localStorage.getItem(key)) return
         resolve(localStorage.getItem(key) as string)
         clearInterval(interval)
      }, time)
   })

   // automatically converts data from localStorage
   // from string to JSON if possible
   try {
      return JSON.parse(await data)
   } catch {
      return data
   }
}
