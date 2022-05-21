type indexStorageNames = 'userProfileDIM' | 'wishlistDIM' | 'clarity'
type indexStorageAction = 'put' | 'get' | 'check'

const dbType = {
   clarity: {
      db: 'clarityDB',
      key: 'manifest',
      permission: 'readwrite' as const,
      store: 'clarityDB'
   },
   userProfileDIM: {
      db: 'keyval-store',
      key: 'dim-api-profile',
      permission: 'readonly' as const,
      store: 'keyval'
   },
   wishlistDIM: {
      db: 'keyval-store',
      key: 'wishlist',
      permission: 'readonly' as const,
      store: 'keyval'
   }
}

export default async function indexStorage(name: indexStorageNames, action: indexStorageAction, data?: any) {
   return await new Promise((resolve, reject) => {
      const dbInfo = dbType[name]
      const dbOpen = indexedDB.open(dbInfo.db)

      // create new DB if needed (will need new first time and if deleted)
      dbOpen.onupgradeneeded = () => {
         const db = dbOpen.result
         if (!db.objectStoreNames.contains(dbInfo.store)) {
            db.createObjectStore(dbInfo.store)
         }
      }

      dbOpen.onsuccess = () => {
         const db = dbOpen.result
         const tx = db.transaction(dbInfo.store, dbInfo.permission)
         const st = tx.objectStore(dbInfo.store)
         if (action === 'put') {
            st.put(data, dbInfo.key)
            resolve(true)
         }
         if (action === 'get') {
            const dbData = st.get(dbInfo.key)
            dbData.onsuccess = () => {
               resolve(dbData.result)
            }
         }
         if (action === 'check') {
            const dbData = st.getKey(dbInfo.key)
            dbData.onsuccess = () => {
               resolve(dbData.result)
            }
         }
      }
   })
}
