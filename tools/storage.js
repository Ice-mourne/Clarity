/**
    ** Get or store data to local storage with automatic JSON conversions.
    ** Then value is present store data otherwise get data from local storage.
    * @param {string} key local storage name
    * @param {*} value optional value to store
*/
function local_storage(key, value) {
    if(value) {
        let new_value = JSON.stringify(value) || value
        localStorage.setItem(key, new_value)
        return
    }

    let item = localStorage.getItem(key)
    return JSON.parse(item) || item
}

/**
    ** Get or store data to session storage with automatic JSON conversions.
    ** Then value is present store data otherwise get data from session storage.
    * @param {string} key session storage name
    * @param {*} value optional value to store
*/
function session_storage(key, value) {
    if(value) {
        let new_value = JSON.stringify(value) || value
        sessionStorage.setItem(key, new_value)
        return
    }

    let item = sessionStorage.getItem(key)
    return JSON.parse(item) || item
}

/**
    * @param {string} path Path to the configuration dot separated
    * @param {*} value value to configure
*/
function update_clarity_settings(path, value) {
    // go to location specified in string if it does not exist create and add/change data in destination
    let settings = local_storage('clarity_settings')

    let splitted = path.split('.')
    let temp = settings
    let i

    for (i = 0; i < splitted.length - 1; i++) {
    temp[splitted[i]] = temp[splitted[i]] || {}
    temp = temp[splitted[i]]
    }

    temp[splitted[i]] = value

    local_storage('clarity_settings', settings)
}

/**
    ** Get promise with data from indexedDB
    *
    * Todo: Add option to store data and better error handling also but ehh
    * @param {string} db Database name
    * @param {string} store Stores name in database
    * @param {string} key Key identifying location of data
    * @returns Promise with requested content from IndexedDB
*/
async function indexed_DB(db, store, key) {
    const x = await new Promise((resolve, reject) => {
        let indexed_db = window.indexedDB.open(db)
        indexed_db.onsuccess = e => {
            let db_1 = e.target.result
            let tx = db_1.transaction(store, 'readonly')
            let st = tx.objectStore(store)
            let data = st.get(key)
            data.onsuccess = () => resolve(data.result)
            data.onerror = () => reject(data)
        }
        indexed_db.onerror = () => reject(data)
        // onerror was put like what ever because newer had problems and didn't bother to make anything decent
    })
    return x
}