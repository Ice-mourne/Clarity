(() => { // create settings on first launch or incase cache was cleared
    if (local_get('clarity_settings') && local_get('clarity_settings').settings_version != 1) return
    let dim_url = document.querySelector('body').baseURI
    let dim_version = dim_url.slice(8, dim_url.search('.destiny'))
    function version() {
        if(dim_version == 'beta') return {'k':'Y2RhN2I2ZTRmYzlmNDlhZGE0ZmVkNjE4ZTExODQxYWI=','i':'37074','s':'MzcwNzQ6eHhYUU1zMjl1OTBBcnpCVi50U2J1MU1Bei01Z1ZoeXdPSmNET3NNWjdjaw=='}
        if(dim_version == 'app') return {'k':'N2I4ZWExNGM0MjZjNGE1MDg1M2MyM2JjZTJkZDU1ZGE=','i':'37290','s':'MzcyOTA6LTA4RnV3RWJ1Wk1TSU03bElvSWNoeVl2bHJkSXpWVlFQMUdUbWk4OVBIcw=='}
    }
    let settings = {
        'dark_mode': false,
        'dark_mode_colors': {
            'background_color_1': 'hsl(240, 21%, 16%)',
            'background_color_2': 'hsl(240, 30%, 4%)',
            'masterwork_item': 'hsl(50, 90%, 65%)',
            'masterwork_item_text': 'hsl(0, 0%, 0%)'
        },
        'settings_version': 2,
        'version': version()
    }
    local_set('clarity_settings', settings)
}) ()
/**
 * @param {string} setting setting to configure
 * @param {*} value value to configure
 */
function update_clarity_settings(setting, value) {
    let stuff = local_get('clarity_settings')
    stuff[setting] = value
    local_set('clarity_settings', stuff)
}
/**
 * Get element in stats window
 * Works as getElementByClassName if . or # is first letter works as querySelector
 * @param {string} className Class name
 * @returns {HTMLElement} A reference to the first object with the specified value
*/
function get_in_content(className) {
    let content = document.getElementById('content').nextSibling
    if(className[0] == '.' || className[0] == '#') return content.querySelector(className)
    return content.getElementsByClassName(className)[0]
}
/**
 * Get stuff from Local Storage
 * @param {string} key 
 * @returns {JSON} JsonObject
 */
function local_get(key) {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch {
        return localStorage.getItem(key)
    }
}
/**
 * Set stuff to Local Storage
 * @param {string} key 
 * @param {any} value 
 */
 function local_set(key, value) {
    if (typeof value == 'object') {localStorage.setItem(key, JSON.stringify(value)); return}
    localStorage.setItem(key, value)
}
/**
 * Set json object to session storage
 * @param {string} key 
 * @param {JSON} value 
 */
function session_set_json(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
}
/**
 * Set json object to session storage
 * @param {string} key 
 * @returns {JSON}
 */
 function session_get_json(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

/**
 * Calculates range in meters
 * @param {number} range_stat In game range stat
 * @param {number} zoom In game zoom stat
 * @param {array} formula Numbers used in formula
 * @param {array} active_perks Active perks on unique item 
 * @returns {number} Actual range in game
 */
function range_calculator(range_stat, zoom, formula, active_perks) {
    let check = active_perks.findIndex(x => x.plugHash == 2846385770 || x.plugHash == 1140096971)
    let zoom_multi = (check != -1) ? 1.1 : 1
    let new_zoom = (zoom - formula.zoom_tier) / 10 + formula.zrm
    return ((range_stat * formula.vpp + formula.base_range) * new_zoom * zoom_multi).toFixed(2) // formula for range
}
/**
 * Calculates reload time in seconds
 * @param {number} reload_stat In game reload stat
 * @param {number} magazine In game magazine size
 * @param {number} weapon_type weapon type Sniper, Shotgun, ect...
 * @param {array} formula Numbers used in formula
 * @param {array} active_perks Needed for shotgun perk Dual Loader
 * @returns {number} Actual reload in game
 */
function reload_calculator(reload_stat, magazine, weapon_type, formula, active_perks) {
    if (weapon_type != 'Shotgun') {
        return (formula.a * reload_stat * reload_stat + formula.b * reload_stat + formula.c).toFixed(2)
    } else {
        let check_for_slugs = active_perks.findIndex(x => x.plugHash == 918679156)
        if (check_for_slugs != -1) {
            let check = active_perks.findIndex(x => x.plugHash == 25606670)
            let multi = (check != -1) ? 2 : 1
            return ((formula.a * reload_stat * reload_stat + formula.b * reload_stat + formula.c) * Math.floor(magazine / multi)).toFixed(2)
        } else { // change formula to work with slugs
            let check = active_perks.findIndex(x => x.plugHash == 25606670)
            let multi = (check != -1) ? 2 : 1
            return ((formula.a * reload_stat * reload_stat + formula.b * reload_stat + formula.c) * Math.floor(magazine / multi)).toFixed(2)
        }
    }
}

/**
 * Gets unique item id and item id from profile json
 * @param {object} json Profile data
 * @returns {object} Object containing unique id and item id
 */
function get_item_hashes(json) {
    console.time("loop_test -  -  -  -  -  -   --   - - - - - - - - - - - - - - - -")
    let items = {}
    for (let i = 0; i < json.Response.profileInventory.data.items.length; i++) {
        const element = json.Response.profileInventory.data.items[i]
        if(element.itemInstanceId) items[element.itemInstanceId] = element.itemHash
    }
    for (let i = 0; i < Object.entries(json.Response.characterInventories.data).length; i++) {
        const ele = Object.entries(json.Response.characterInventories.data)[i]
        for (let y = 0; y < ele[1].items.length; y++) {
            const element = ele[1].items[y];
            if(element.itemInstanceId) items[element.itemInstanceId] = element.itemHash
        }
    }
    for (let i = 0; i < Object.entries(json.Response.characterEquipment.data).length; i++) {
        const ele = Object.entries(json.Response.characterEquipment.data)[i]
        for (let y = 0; y < ele[1].items.length; y++) {
            const element = ele[1].items[y];
            if(element.itemInstanceId) items[element.itemInstanceId] = element.itemHash
        }
    }
    console.timeEnd("loop_test -  -  -  -  -  - - - - - - - - - - - - - - - - - - -")
    return items
}